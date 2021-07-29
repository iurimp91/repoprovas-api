import { getRepository, Repository } from "typeorm";

import { ExamInterface } from "../interfaces/ExamInterface";
import Exam from "../entities/Exam";
 
async function createExam(exam: ExamInterface) {
    const newExam = await getRepository(Exam).create(exam);

    await getRepository(Exam).save(newExam);
}

export { createExam };