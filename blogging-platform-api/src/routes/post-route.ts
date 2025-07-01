import express from "express";
import { PostController } from "../controllers/post-controller";
export const postRoute = express.Router();

postRoute.post("/posts", PostController.create);
