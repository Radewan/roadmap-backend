import express from "express";
import { postRoute } from "../routes/post-route";
import { errorMiddleware } from "../middlewares/error-middleware";

export const web = express();

web.use(express.json());

web.use(postRoute);

web.use(errorMiddleware);
