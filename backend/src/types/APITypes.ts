import { StatusCodes } from "http-status-codes";

export interface ResponseEnvelope<T> {
  statusCode: StatusCodes;
  message?: string;
  payload?: T;
}

export interface RecipeResponse {
  recipeID: number;
  authorID: number;
  authorName: string;
  title: string;
  prepTime: number;
  servings: number;
  instructions: string;
  ingredients: { ingredientName: string, amount: number }[];
  tools: {toolID: number, toolName: string }[];
  tags: {tagID: number, tagName: string}[];
}

export interface RecipeRequest {
  recipeID: number;
  authorID: number;
  title: string;
  prepTime: number;
  servings: number;
  instructions: string;
  ingredients: { ingredientName: string, amount: number }[];
  tools: number[];
  tags: number[];
}

export interface CreateRecipeResponse {
  recipeID: number;
}