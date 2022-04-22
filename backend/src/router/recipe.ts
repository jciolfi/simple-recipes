import { Express } from 'express';
import BodyParser = require('body-parser');
import { StatusCodes } from 'http-status-codes';


export default function addRecipeRoutes(app: Express) {
    // ping server, verify working
    app.get('/testtest', BodyParser.json(), (req, res) => {
        res.status(StatusCodes.OK).json('testtest');
    });
}