import { Express } from 'express';
import BodyParser = require('body-parser');
import { StatusCodes } from 'http-status-codes';
import { getRecipeByID } from '../respository/recipes';
import { getRecipeByIDHandler, getRecipesByCriteriaHandler } from '../requestHandlers/recipes';


export default function addRecipeRoutes(app: Express) {
    // ping server, verify working
    app.get('/testtest', BodyParser.json(), (_, res) => {
      res.status(StatusCodes.OK).json('running');
    });

    // GET recipe by ID
    app.get('/recipes/:recipeID', BodyParser.json(), async (req, res) => {
      try {
        const envelope = await getRecipeByIDHandler(req.params.recipeID);
        if (envelope.statusCode === StatusCodes.OK) {
          res.status(envelope.statusCode).json(envelope.payload);
        } else {
          res.status(envelope.statusCode).json(envelope.message);
        }
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: `GET recipe by ID ${req.params.recipeID} internal error`
        });
      }
    });

    // GET recipe by criteria
    app.get('/recipes', BodyParser.json(), async (req, res) => {
      try {
        const envelope = await getRecipesByCriteriaHandler(
          req.query.title as string | undefined, 
          req.query.user as string | undefined,
          req.query.tags as string | undefined);
        if (envelope.statusCode === StatusCodes.OK) {
          res.status(envelope.statusCode).json(envelope.payload);
        } else {
          res.status(envelope.statusCode).json(envelope.message);
        }
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: `GET recipe by criteria internal error`
        });
      }
    });
}