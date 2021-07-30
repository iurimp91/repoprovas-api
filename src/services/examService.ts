import { getRepository } from "typeorm";

import Exam from "../entities/Exam";
 
async function createExam(exam: Exam) {
    await getRepository(Exam).insert(exam);
}

export { createExam };