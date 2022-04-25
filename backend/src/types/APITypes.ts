import { StatusCodes } from "http-status-codes";

export interface ResponseEnvelope<T> {
  statusCode: StatusCodes;
  message?: string;
  payload?: T;
}

export interface RecipeResponse {
  recipeID: string;
  authorID: string;
  authorName: string;
  title: string;
  prepTime: number;
  servings: number;
  instructions: string;
  ingredients: { ingredientName: string, amount: number }[];
  tools: {toolID: string, toolName: string }[];
  tags: {tagID: string, tagName: string}[];
}