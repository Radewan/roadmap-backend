import express from "express";
import { PostController } from "../controllers/post-controller";
export const postRoute = express.Router();

postRoute.post("/posts", PostController.create);

postRoute.put("/posts/:postId", PostController.put);
postRoute.delete("/posts/:postId", PostController.delete);
postRoute.get("/posts/:postId", PostController.get);
postRoute.get("/posts", PostController.getAll);
