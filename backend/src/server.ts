import Express = require('express');
import * as http from 'http';
import CORS = require('cors');
import BodyParser = require('body-parser');
import addRecipeRoutes from './router/recipes';
import { AddressInfo } from 'net';
import { StatusCodes } from 'http-status-codes';

const app = Express();
app.use(CORS());
app.use(BodyParser.urlencoded({extended: true}));
const server = http.createServer(app);

// ping server, verify working
app.get('/testtest', BodyParser.json(), (_, res) => {
  res.status(StatusCodes.OK).json('running');
});
addRecipeRoutes(app);

server.listen(8080, () => {
    const address = server.address() as AddressInfo;
    console.log(`Listening on ${address.port}`);
});

