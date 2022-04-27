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

  // check valid email
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!regexp.test(user.email)) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error createUser: invalid email ${user.email}` 
    };
  }

  // check valid username (alphanumeric)
  if (!/\W|_/.test(user.username)) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error createUser: invalid username ${user.username}` 
    };
  }

  // check valid password (no spaces)
  if (/\s/.test(user.pass)) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      message: `Error createUser: invalid password; password cannot contain spaces` 
    };
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
      message: `Error getRecipeByID: Could not find user with ID ${userID}`
    };
}