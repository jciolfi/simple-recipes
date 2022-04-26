import { StatusCodes } from 'http-status-codes';
import { getRecipeByID, getRecipesByCriteria, createRecipe, getMaxRecipeID, deleteRecipeByID, updateRecipe } from '../respository/recipes';
import { UpsertRecipeRequest, CreateRecipeResponse, RecipeResponse, ResponseEnvelope } from '../types/APITypes';

export async function getRecipeByIDHandler(recipeID: string): Promise<ResponseEnvelope<RecipeResponse>> {
  if (!recipeID || isNaN(+recipeID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error getRecipeByID: valid recipeID must be specified (ID: ${recipeID})`
    }
  }

  const recipe = await getRecipeByID(+recipeID);
  return recipe
    ? { statusCode: StatusCodes.OK, payload: recipe }
    : { statusCode: StatusCodes.NOT_FOUND, 
        message: `Error getRecipeByID: Could not find recipe with ID ${recipeID}`
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
      message: `Error getRecipesByCriteria: valid userID must be specified (ID: ${user})`
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
  let maxRecipeID: number;
  try {
    maxRecipeID = await getMaxRecipeID();
  } catch {
    throw new Error('Issue creating new recipe, could not find unique ID');
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
      message: `Error deleteRecipeByID: valid recipeID must be specified (ID: ${recipeID})`
    }
  }

  await deleteRecipeByID(+recipeID);
  return {
    statusCode: StatusCodes.OK,
    payload: {}
  }
}

export async function updateRecipeHandler(recipeID: string, recipe: UpsertRecipeRequest): Promise<ResponseEnvelope<RecipeResponse>> {
  if (!recipeID || isNaN(+recipeID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error deleteRecipeByID: valid recipeID must be specified (ID: ${recipeID})`
    }
  }

  const updateSuccess = await updateRecipe(+recipeID, recipe);

  return updateSuccess
  ? { statusCode: StatusCodes.OK, payload: (await getRecipeByID(+recipeID)) }
  : { statusCode: StatusCodes.BAD_REQUEST, 
      message: `Error updateRecipe: failed to update recipe (ID: ${recipeID})` 
    };
}