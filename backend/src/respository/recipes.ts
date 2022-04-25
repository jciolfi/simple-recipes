import dotenv from 'dotenv';
import mysql from 'mysql';
import { resolve } from 'path';
import { RecipeResponse } from '../types/APITypes';

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
      HAVING recipe_id = ?
    ) as T
    GROUP BY recipe_id, tags, tools;`;

  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (error, results, _fields) => {
      if (error) {
        reject(error);
      } else if (!results || results.length === 0) {
        resolve(undefined);
      } else {
        const ingredients: { ingredientName: string, amount: number }[] = [];
        results[0].ingredients.split('@@').forEach(i => {
          const items = i.split('##');
          ingredients.push({ ingredientName: items[0], amount: +items[1] });
        });

        let recipe: RecipeResponse = {
          recipeID: results[0].recipe_id,
          authorID: results[0].user_id,
          authorName: results[0].username,
          title: results[0].title,
          prepTime: results[0].prep_time,
          servings: results[0].servings,
          instructions: results[0].instructions,
          ingredients,
          tools: results[0].tools.split('##'),
          tags: results[0].tags.split('##')
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
    criteria.push(`r.title = ${title}`);
  }
  if (user) {
    criteria.push(`r.author_id = ${user}`);
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
  
    console.log(query);
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
    })
}