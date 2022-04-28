import { StatusCodes } from 'http-status-codes';
import { getRecipeByID, getRecipesByCriteria, createRecipe, getMaxRecipeID, deleteRecipeByID, updateRecipe, getTools, getTags } from '../respository/recipes';
import { UpsertRecipeRequest, CreateRecipeResponse, RecipeResponse, ResponseEnvelope, RecipeToolsResponse, RecipeTagsResponse } from '../types/APITypes';

export async function getRecipeByIDHandler(recipeID: string): Promise<ResponseEnvelope<RecipeResponse>> {
  if (!recipeID || isNaN(+recipeID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid recipeID must be specified (ID: ${recipeID})` }
    }
  }

  const recipe = await getRecipeByID(+recipeID);
  return recipe
    ? { statusCode: StatusCodes.OK, payload: recipe }
    : { statusCode: StatusCodes.NOT_FOUND, 
        error: { message: `Could not find recipe with ID ${recipeID}` }
      };
}

export async function getRecipesByCriteriaHandler(
  title: string | undefined,
  user: string | undefined,
  tags: string | undefined
): Promise<ResponseEnvelope<RecipeResponse[]>> {
  if (user && isNaN(+user)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid userID must be specified (ID: ${user})` }
    }
  }

  const recipes = await getRecipesByCriteria(
    title,
    user ? +user : undefined,
    tags ? tags.split(',') : undefined,
  );

  return {
    statusCode: StatusCodes.OK,
    payload: recipes
  }
}

export async function createRecipeHandler(recipe: UpsertRecipeRequest): Promise<ResponseEnvelope<CreateRecipeResponse>> {
  if (malformedRecipeDetails(recipe)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Must specify all fields when creating a recipe` }
    };
  }

  let maxRecipeID: number;
  try {
    maxRecipeID = await getMaxRecipeID();
  } catch {
    throw new Error('Issue creating new recipe, could not find unique ID');
  }

  if (recipe.ingredients.some(i => i.ingredientName.includes('@@') || i.ingredientName.includes('##'))) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Recipe ingredients cannot include @@ or ##` }
    }
  }


  const newRecipe = await createRecipe(maxRecipeID + 1, recipe);

  return {
    statusCode: StatusCodes.CREATED,
    payload: newRecipe
  }
}

export async function deleteRecipeByIDHandler(recipeID: string): Promise<ResponseEnvelope<{}>> {
  if (!recipeID || isNaN(+recipeID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid recipeID must be specified (ID: ${recipeID})` }
    }
  }

  await deleteRecipeByID(+recipeID);
  return {
    statusCode: StatusCodes.OK,
    payload: {}
  }
}

export async function updateRecipeHandler(recipeID: string, recipe: UpsertRecipeRequest): Promise<ResponseEnvelope<RecipeResponse>> {
  if (malformedRecipeDetails(recipe)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Must specify all fields when creating a recipe` }
    };
  }

  if (!recipeID || isNaN(+recipeID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid recipeID must be specified (ID: ${recipeID})` }
    }
  }

  const updateSuccess = await updateRecipe(+recipeID, recipe);

  return updateSuccess
  ? { statusCode: StatusCodes.OK, payload: (await getRecipeByID(+recipeID)) }
  : { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, 
      error: { message: `Failed to update recipe (ID: ${recipeID})` }
    };
}

export async function getToolsHandler(): Promise<ResponseEnvelope<RecipeToolsResponse>> {
  const tools = await getTools();
  return {
    statusCode: StatusCodes.OK,
    payload: tools
  };
}

export async function getTagsHandler(): Promise<ResponseEnvelope<RecipeTagsResponse>> {
  const tags = await getTags();
  return {
    statusCode: StatusCodes.OK,
    payload: tags
  };
}

function malformedRecipeDetails(recipe: UpsertRecipeRequest): boolean {
  return !recipe || recipe.authorID === undefined || recipe.ingredients === undefined
    || !recipe.instructions || recipe.prepTime === undefined 
    || recipe.servings === undefined || recipe.tags === undefined
    || !recipe.title || recipe.tools === undefined;
}