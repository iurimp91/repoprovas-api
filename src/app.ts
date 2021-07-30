import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as examController from "./controllers/examController";
import * as categoriesController from "./controllers/categoriesController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/exam", examController.postExam);

app.get("/categories", categoriesController.getCategories);

export default app;

export async function init() {
  await connectDatabase();
}
