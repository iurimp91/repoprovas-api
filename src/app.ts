import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as examController from "./controllers/examController";
import * as categoriesController from "./controllers/categoriesController";
import * as subjectsController from "./controllers/subjectsController";
import * as teachersController from "./controllers/teachersController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/exam", examController.postExam);

app.get("/exam/:id", examController.getExam);

app.get("/categories", categoriesController.getCategories);

app.get("/categories/teacher/:id", categoriesController.getCategoriesExamsByTeacher);

app.get("/categories/subject/:id", categoriesController.getCategoriesExamsBySubject);

app.get("/subjects", subjectsController.getSubjects);

app.get("/teachers/:id", teachersController.getTeachersBySubject);

app.get("/teachers", teachersController.getTeachers);

export default app;

export async function init() {
  await connectDatabase();
}
