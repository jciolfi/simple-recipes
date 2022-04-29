import { Express } from 'express';
import BodyParser = require('body-parser');
import { StatusCodes } from 'http-status-codes';
import { createUserHandler, deleteUserByIDHandler, getUserByIDHandler, loginUserHandler } from '../requestHandlers/users';

export default function addUserRoutes(app: Express) {
  // POST user
  app.post('/users', BodyParser.json(), async (req, res) => {
    try {
      const envelope = await createUserHandler({
        email: req.body.email,
        pass: req.body.pass,
        username: req.body.username
      });
      if (envelope.statusCode === StatusCodes.CREATED) {
        res.status(envelope.statusCode).json(envelope.payload);
      } else {
        res.status(envelope.statusCode).json(envelope.error);
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `POST users internal error`
      });
    }
  });

  // POST new user session
  app.post('/users/login', BodyParser.json(), async (req, res) => {
    try {
      const envelope = await loginUserHandler(
        req.body.email, 
        req.body.pass
      );
      if (envelope.statusCode === StatusCodes.OK) {
        res.status(envelope.statusCode).json(envelope.payload);
      } else {
        res.status(envelope.statusCode).json(envelope.error);
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `POST user login internal error`
      });
    }
  });

  // GET user by ID
  app.get('/users/:userID', BodyParser.json(), async (req, res) => {
    try {
      const envelope = await getUserByIDHandler(req.params.userID);
      if (envelope.statusCode === StatusCodes.OK) {
        res.status(envelope.statusCode).json(envelope.payload);
      } else {
        res.status(envelope.statusCode).json(envelope.error);
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `GET user by ID ${req.params.userID} internal error`
      });
    }
  });

  // DELETE user by ID
  app.delete('/users/:userID', BodyParser.json(), async (req, res) => {
    try {
      const envelope = await deleteUserByIDHandler(req.params.userID);
      if (envelope.statusCode === StatusCodes.OK) {
        res.status(envelope.statusCode).json(envelope.payload);
      } else {
        res.status(envelope.statusCode).json(envelope.error);
      }
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `DELETE user by ID ${req.params.userID} internal error`
      });
    }
  });
}