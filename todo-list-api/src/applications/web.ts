import express from "express";
import { publicRouter } from "../routers/public-route";
import { errorMiddleware } from "../middlewares/error-middleware";
import { privateRouter } from "../routers/private-route";

export const web = express();

web.use(express.json());

web.use(publicRouter);
web.use(privateRouter);

web.use(errorMiddleware);
