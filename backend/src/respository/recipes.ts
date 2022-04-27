import dotenv from 'dotenv';
import mysql from 'mysql';
import { UpsertRecipeRequest, CreateRecipeResponse, RecipeResponse, RecipeTagsResponse, RecipeToolsResponse } from '../types/APITypes';

const config = dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect((err) => {
  if (!err) {
    console.log('Connected as id ' + connection.threadId);
  } else {
    console.log(err);
    throw new Error('Failed to connect to database');
  }
});

export function getRecipeByID(recipeID: number): Promise<RecipeResponse | undefined> {
  const placeholders = [recipeID];
  const query = `CALL get_recipe(?);`

  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (error, results, _fields) => {
      if (error) {
        reject(error);
      } else if (!results || results.length === 0 || results[0].length === 0) {
        resolve(undefined);
      } else {
        const ingredients: { ingredientName: string, amount: number }[] = [];
        results[0][0].ingredients.split('@@').forEach(i => {
          const items = i.split('##');
          ingredients.push({ ingredientName: items[0], amount: +items[1] });
        });

        let recipe: RecipeResponse = {
          recipeID: results[0][0].recipe_id,
          authorID: results[0][0].user_id,
          authorName: results[0][0].username,
          title: results[0][0].title,
          prepTime: results[0][0].prep_time,
          servings: results[0][0].servings,
          instructions: results[0][0].instructions,
          ingredients,
          tools: results[0][0].tools.split('##'),
          tags: results[0][0].tags.split('##')
        }

        resolve(recipe);
      }
    });
  });
}

export function getRecipesByCriteria(
  title: string | undefined,
  user: number | undefined,
  tags: string[] | undefined
): Promise<RecipeResponse[]> {
  let criteria: string[] = [];
  if (title) {
    criteria.push(`r.title LIKE '%${title}%'`);
  }
  if (user) {
    criteria.push(`u.user_id = ${user}`);
  }
  if (tags) {
    tags.forEach(tag => {
      criteria.push(`tags LIKE '%${tag}%'`);
    });
  }

  let havingClause = '';
  if (criteria.length > 0) {
    havingClause = `HAVING ${criteria.join(' AND ')}`;
  }

  const query = 
    `SELECT
      recipe_id,
      username,
      title,
      prep_time,
      servings,
      GROUP_CONCAT(DISTINCT T.ingredient_amts SEPARATOR '@@') AS ingredients,
      tags,
      tools
    FROM 
    (
      SELECT
        r.recipe_id,
        u.user_id,
        u.username,
        r.title,
        r.prep_time,
        r.servings,
        CONCAT(ri.ingredient_name, '##', ri.amount) AS ingredient_amts,
        GROUP_CONCAT(DISTINCT tg.tag_name SEPARATOR '##') AS tags, 
        GROUP_CONCAT(DISTINCT tl.tool_name SEPARATOR '##') AS tools
      FROM
        recipes r
      JOIN 
        users u ON r.author_id = u.user_id
      JOIN
        recipe_ingredients ri ON r.recipe_id = ri.recipe_id
      JOIN
        recipe_tags rtg ON r.recipe_id = rtg.recipe_id
      JOIN 
        tags tg ON rtg.tag_id = tg.tag_id
      JOIN 
        recipe_tools rtl ON r.recipe_id = rtl.recipe_id
      JOIN 
        tools tl ON rtl.tool_id = tl.tool_id
      GROUP BY r.recipe_id, ri.ingredient_name
      ${havingClause}
    ) as T
    GROUP BY recipe_id, tags, tools;`
  
    return new Promise((resolve, reject) => {
      connection.query(query, [], (error, results, _fields) => {
        if (error) {
          reject(error);
        } else {
          let recipes: RecipeResponse[] = [];

          results.forEach(result => {
            const ingredients: { ingredientName: string, amount: number }[] = [];
            results[0].ingredients.split('@@').forEach(i => {
              const items = i.split('##');
              ingredients.push({ ingredientName: items[0], amount: +items[1] });
            });

            recipes.push({
              recipeID: result.recipe_id,
              authorID: result.user_id,
              authorName: result.username,
              title: result.title,
              prepTime: result.prep_time,
              servings: result.servings,
              instructions: result.instructions,
              ingredients,
              tools: result.tools.split('##'),
              tags: result.tags.split('##')
            });
          });
          
          resolve(recipes);
        }
      });
    });
}

export function updateRecipe(recipeID: number, recipe: UpsertRecipeRequest): Promise<boolean> {
  const recipePlaceholders = [
    recipe.authorID,
    recipe.title,
    recipe.prepTime,
    recipe.servings,
    recipe.instructions,
    recipeID
  ];
  const recipeUpdate =
  `UPDATE recipes
  SET author_id = ?,
      title = ?,
      prep_time = ?,
      servings = ?,
      instructions = ?
  WHERE recipe_id = ?;`;

  const deletePlaceholders = [recipeID];
  const ingredientsDelete = `DELETE FROM recipe_ingredients WHERE recipe_id = ?`;
  const toolsDelete = `DELETE FROM recipe_tools WHERE recipe_id = ?`;
  const tagsDelete = `DELETE FROM recipe_tags WHERE recipe_id = ?`;

  return new Promise(async (resolve, reject) => {
    connection.query(recipeUpdate, recipePlaceholders, (error, _results, _fields) => {
      if (error) {
        console.log('update');
        console.log(error);
        reject(error);
      }
    });

    connection.query(ingredientsDelete, deletePlaceholders, (error, _results, _fields) => {
      if (error) {
        console.log('ingredients delete');
        console.log(error);
        reject(error);
      }
    });
    connection.query(toolsDelete, deletePlaceholders, (error, _results, _fields) => {
      if (error) {
        console.log('tools delete');
        console.log(error);
        reject(error);
      }
    });
    connection.query(tagsDelete, deletePlaceholders, (error, _results, _fields) => {
      if (error) {
        console.log('tags delete');
        console.log(error);
        reject(error);
      }
    });
    
    try {
      insertRecipeAssociations(recipeID, recipe);
    } catch (error) {
      console.log('caught error');
      console.log(error);
      reject (error);
    }

    resolve(true);
  });
}

export function createRecipe(recipeID: number, recipe: UpsertRecipeRequest): Promise<CreateRecipeResponse> {
  const recipePlaceholders = [
    recipeID,
    recipe.authorID,
    recipe.title,
    recipe.prepTime,
    recipe.servings,
    recipe.instructions
  ];
  const recipeInsert =
  `INSERT INTO recipes (recipe_id, author_id, title, prep_time, servings, instructions)
  VALUES (?, ?, ?, ?, ?, ?);`;
  
  return new Promise((resolve, reject) => {
    connection.query(recipeInsert, recipePlaceholders, (error, _results, _fields) => {
      if (error) reject(error);
    });

    try {
      insertRecipeAssociations(recipeID, recipe);
    } catch (error) {
      // Flush recipe with recipeID; make sure none of it is in DB
      deleteRecipeByID(recipeID);
      reject (error);
    }

    resolve({ recipeID });
  });
}

function insertRecipeAssociations(recipeID: number, recipe: UpsertRecipeRequest) {
  // Insert into recipe_ingredients table
  const ingredientVals: string[] = [];
  recipe.ingredients.forEach(i => {
    ingredientVals.push(`(${recipeID}, '${i.ingredientName}', ${i.amount})`);
  });
  const ingredientsInsert = 
  `INSERT INTO recipe_ingredients (recipe_id, ingredient_name, amount)
  VALUES ${ingredientVals.join(', ')};`;
  connection.query(ingredientsInsert, [], (error, _results, _fields) => {
    if (error) throw error;
  });

  // Insert into recipe_tools table
  const toolVals: string[] = [];
  recipe.tools.forEach(t => {
    toolVals.push(`(${recipeID}, ${t})`);
  });
  const toolsInsert = 
  `INSERT INTO recipe_tools (recipe_id, tool_id)
  VALUES ${toolVals.join(', ')};`;
  connection.query(toolsInsert, [], (error, _results, _fields) => {
    if (error) throw error;
  });

  // Insert into recipe_tags table
  const tagVals: string[] = [];
  recipe.tags.forEach(t => {
    tagVals.push(`(${recipeID}, ${t})`);
  });
  const tagsInsert =
  `INSERT INTO recipe_tags (recipe_id, tag_id)
  VALUES ${tagVals.join(', ')};`;  
  connection.query(tagsInsert, [], (error, _results, _fields) => {
    if (error) throw error;
  });
}

export function getMaxRecipeID(): Promise<number> {
  const query = `SELECT max(recipe_id) AS max_recipe_id FROM recipes;`;
  return new Promise((resolve, reject) => {
    connection.query(query, [], (error, results, _fields) => {
      if (error) {
        reject(error)
      } else if (!results || results.length === 0) {
        resolve(0);
      } else {
        resolve(results[0].max_recipe_id);
      }
    });
  })
}

export function deleteRecipeByID(recipeID: number): Promise<{}> {
  const placeholders = [recipeID];
  const query = `DELETE FROM recipes WHERE recipe_id = ?;`;

  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (error, _results, _fields) => {
      if (error) {
        reject(error);
      } else {
        resolve({});
      }
    })
  });
}

export function getTools(): Promise<RecipeToolsResponse> {
  const query = `SELECT * FROM tools;`;

  return new Promise((resolve, reject) => {
    connection.query(query, [], (error, results, _fields) => {
      if (error) {
        reject(error);
      } else {
        const tools: { toolID: number, toolName: string }[] = [];
        results.forEach(row => {
          tools.push({ toolID: row.tool_id, toolName: row.tool_name });
        });

        resolve({ tools: tools });
      }
    });
  });
}

export function getTags(): Promise<RecipeTagsResponse> {
  const query = `SELECT * FROM tags;`

  return new Promise((resolve, reject) => {
    connection.query(query, [], (error, results, _fields) => {
      if (error) {
        reject(error);
      } else {
        const tags: { tagID: number, tagName: string }[] = [];
        results.forEach(row => {
          tags.push({ tagID: row.tag_id, tagName: row.tag_name });
        });

        resolve({ tags: tags });
      }
    });
  });
}