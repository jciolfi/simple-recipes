import { StatusCodes } from "http-status-codes";
import { createUser, getMaxUserID, getUserByID } from "../respository/users";
import { CreateUserRequest, UserResponse, ResponseEnvelope } from "../types/APITypes";


export async function createUserHandler(user: CreateUserRequest): Promise<ResponseEnvelope<UserResponse>> {
  let maxUserID: number;
  try {
    maxUserID = await getMaxUserID();
  } catch {
    throw new Error('Issue creating new recipe, could not find unique ID');
  }

  const userID = maxUserID + 1;
  const success = await createUser(userID, user);
  
  return success
  ? { statusCode: StatusCodes.CREATED, payload: (await getUserByID(userID)) }
  : { statusCode: StatusCodes.BAD_REQUEST,
      message: `Error createUser: Could not create user` 
    };
}

export async function getUserByIDHandler(userID: string): Promise<ResponseEnvelope<UserResponse>> {
  if (!userID || isNaN(+userID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error getUserByID: valid userID must be specified (ID: ${userID})`
    }
  }

  const user = await getUserByID(+userID);

  return user
  ? { statusCode: StatusCodes.OK, payload: user }
    : { statusCode: StatusCodes.NOT_FOUND, 
        message: `Error getRecipeByID: Could not find recipe with ID ${userID}`
      };
}