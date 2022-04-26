import dotenv from 'dotenv';
import mysql from 'mysql';
import { CreateUserRequest, UserResponse } from '../types/APITypes';

const config = dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect((err) => {
  if (!err) {
    console.log('Connected as id ' + connection.threadId);
  } else {
    console.log(err);
    throw new Error('Failed to connect to database');
  }
});

export function createUser(userID: number, user: CreateUserRequest): Promise<boolean> {
  const placeholders = [
    userID,
    user.email,
    user.pass,
    user.username
  ];
  const query =
  `INSERT INTO users (user_id, email, pass, username)
  VALUES (?, ?, ?, ?)`;

  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (error, _results, _fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

export function getMaxUserID(): Promise<number> {
  const query = `SELECT max(user_id) AS max_user_id FROM users`;

  return new Promise((resolve, reject) => {
    connection.query(query, [], (error, results, _fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results[0].max_user_id);
      }
    });
  });
}

export function getUserByID(userID: number): Promise<UserResponse | undefined> {
  const placeholders = [userID];
  const query = `CALL get_user(?)`;

  return new Promise((resolve, reject) => {
    connection.query(query, placeholders, (error, results, _fields) => {
      if (error) {
        reject(error);
      } else if (!results || results.length === 0 || results[0].length === 0) {
        resolve(undefined);
      } else {
        const user = {
          userID: results[0][0].user_id,
          email: results[0][0].email,
          username: results[0][0].username
        };
        resolve(user);
      }
    });
  });
}