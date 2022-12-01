import express from 'express';
import path from 'path';
import cors from 'cors';
import router from "./router"
import Repository from './repository/db';
import { endpointLogger } from './middlewares/logger';

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json");

export default async () => {
    const app = express();

    // Express configuration
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(endpointLogger);

    // swagger
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    // in-memory db init
    await Repository.init();

    app.use("/", router)

    return app;
};
