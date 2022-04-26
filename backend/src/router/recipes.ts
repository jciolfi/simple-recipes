import { Express } from 'express';
import BodyParser = require('body-parser');
import { StatusCodes } from 'http-status-codes';
import { getRecipeByID } from '../respository/recipes';
import { createRecipeHandler, deleteRecipeByIDHandler, getRecipeByIDHandler, getRecipesByCriteriaHandler } from '../requestHandlers/recipes';


export default function addRecipeRoutes(app: Express) {
    app.post('/recipes', BodyParser.json(), async (req, res) => {
      try {
        console.log(req.body);
        const envelope = await createRecipeHandler({
          recipeID: 0,
          authorID: req.body.authorID,
          title: req.body.title,
          prepTime: req.body.prepTime,
          servings: req.body.servings,
          instructions: req.body.instructions,
          ingredients: req.body.ingredients,
          tools: req.body.tools,
          tags: req.body.tags
        });
        if (envelope.statusCode === StatusCodes.CREATED) {
          res.status(envelope.statusCode).json(envelope.payload);
        } else {
          res.status(envelope.statusCode).json(envelope.message);
        }
      } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: `POST recipe internal error`
        });
      }
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

    // DELETE recipe by ID
    app.delete('/recipes/:recipeID', BodyParser.json(), async (req, res) => {
      try {
        const envelope = await deleteRecipeByIDHandler(req.params.recipeID);
        if (envelope.statusCode === StatusCodes.OK) {
          res.status(envelope.statusCode).json(envelope.payload);
        } else {
          res.status(envelope.statusCode).json(envelope.message);
        }
      } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: `DELETE recipe by ID ${req.params.recipeID} internal error`
        });
      }
    });
}