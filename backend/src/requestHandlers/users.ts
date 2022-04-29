import { StatusCodes } from "http-status-codes";
import { createUser, deleteUserByID, getMaxUserID, getUserByID, isUniqueEmail, isUniqueUsername, loginUser } from "../respository/users";
import { CreateUserRequest, UserResponse, ResponseEnvelope, LoginUserResponse } from "../types/APITypes";


export async function createUserHandler(user: CreateUserRequest): Promise<ResponseEnvelope<UserResponse>> {
  if (!user || !user.email || !user.pass || !user.username) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Must specify user email, pass, and username to create an account` }
    };
  }  

  let maxUserID: number;
  try {
    maxUserID = await getMaxUserID();
  } catch {
    throw new Error('Issue creating new recipe, could not find unique ID');
  }

  user.email = user.email.toLowerCase();
  // check valid email
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!regexp.test(user.email)) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Invalid email ${user.email}` }
    };
  }
  const uniqueEmail = await isUniqueEmail(user.email);
  if (!uniqueEmail) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Email ${user.email} already taken` }
    };
  }

  // check valid username (alphanumeric)
  if (/\W|_/.test(user.username)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Invalid username ${user.username}, username must be alphanumeric` }
    };
  }
  const uniqueUsername = await isUniqueUsername(user.username);
  if (!uniqueUsername) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Username ${user.username} already taken` }
    };
  }

  // check valid password (no spaces)
  if (/\s/.test(user.pass)) {
    return { 
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Invalid password; password cannot contain spaces` }
    };
  }

  const userID = maxUserID + 1;
  const success = await createUser(userID, user);
  
  return success
  ? { statusCode: StatusCodes.CREATED, payload: (await getUserByID(userID)) }
  : { statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message: `Could not create user` }
    };
}

export async function getUserByIDHandler(userID: string): Promise<ResponseEnvelope<UserResponse>> {
  if (!userID || isNaN(+userID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid userID must be specified (ID: ${userID})` }
    };
  }
  
  const user = await getUserByID(+userID);

  return user
  ? { statusCode: StatusCodes.OK, payload: user }
  : { statusCode: StatusCodes.NOT_FOUND, 
      error: { message: `Could not find user with ID ${userID}` }
    };
}

export async function deleteUserByIDHandler(userID: string): Promise<ResponseEnvelope<{}>> {
  if (!userID || isNaN(+userID)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `Valid userID must be specified (ID: ${userID})` }
    }
  }
  
  await deleteUserByID(+userID);
  return {
    statusCode: StatusCodes.OK,
    payload: {}
  };
}

export async function loginUserHandler(
  email: string, 
  pass: string
): Promise<ResponseEnvelope<LoginUserResponse>> {
  const uniqueEmail = await isUniqueEmail(email);
  if (uniqueEmail) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      error: { message: `No existing account with email ${email}` }
    };
  }

  const user = await loginUser(email, pass);
  return {
    statusCode: StatusCodes.OK,
    payload: user
  };
}