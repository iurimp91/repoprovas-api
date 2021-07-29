import { getRepository } from "typeorm";

import ExamInterface from "../interfaces/ExamInterface";
import Exam from "../entities/Exam";
 
async function createExam(exam: ExamInterface) {
    await getRepository(Exam).insert(exam);
}

export { createExam };