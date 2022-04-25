import { StatusCodes } from 'http-status-codes';
import { getRecipeByID, getRecipesByCriteria } from '../respository/recipes';
import { RecipeResponse, ResponseEnvelope } from '../types/APITypes';

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
    tags ? tags.split('##') : undefined,
  );

  return {
    statusCode: StatusCodes.OK,
    payload: recipes
  }
}
