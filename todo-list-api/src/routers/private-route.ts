import { TodoController } from "../controllers/todo-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import express from "express";

export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/todos", TodoController.create);
privateRouter.put("/todos/:todoId", TodoController.update);
privateRouter.delete("/todos/:todoId", TodoController.delete);
privateRouter.get("/todos", TodoController.get)
