import { StatusCodes } from "http-status-codes";
export interface ResponseEnvelope<T> {
  statusCode: StatusCodes;
  message?: string;
  payload?: T;
}

// --- Recipes ---

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

export interface UpsertRecipeRequest {
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

// --- Users ---
export interface UserResponse {
  userID: number;
  email: string;
  username: string;
}
export interface CreateUserRequest {
  email: string;
  pass: string;
  username: string;
}