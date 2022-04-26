import { StatusCodes } from 'http-status-codes';
import { getRecipeByID, getRecipesByCriteria, createRecipe, getMaxRecipeID, deleteRecipeByID } from '../respository/recipes';
import { CreateRecipeRequest, CreateRecipeResponse, Recipe, ResponseEnvelope } from '../types/APITypes';

export async function getRecipeByIDHandler(recipeID: string): Promise<ResponseEnvelope<Recipe>> {
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
): Promise<ResponseEnvelope<Recipe[]>> {
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

export async function createRecipeHandler(recipe: CreateRecipeRequest): Promise<ResponseEnvelope<CreateRecipeResponse>> {
  const recipeID = await getMaxRecipeID();
  if (!recipeID || recipe.recipeID <= 0) {
    throw new Error('Issue creating new recipe, could not find unique ID');
  }

  recipe.recipeID = recipeID + 1;
  const newRecipe = await createRecipe(recipe);

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