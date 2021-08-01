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

app.get("/categories", categoriesController.getCategories);

app.get("/categories/:teacherId", categoriesController.getCategoriesExamsByTeacher);

app.get("/subjects", subjectsController.getSubjects);

app.get("/teachers/:subjectId", teachersController.getTeachersBySubject);

app.get("/teachers", teachersController.getTeachers);

//app.get("/teacher/:id", teachersController.getTeacherExams);

export default app;

export async function init() {
  await connectDatabase();
}
