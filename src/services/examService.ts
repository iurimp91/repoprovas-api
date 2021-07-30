import { getRepository } from "typeorm";

import Exam from "../entities/Exam";
 
async function createExam(exam: Exam) {
    const examAlreadyExists = await getRepository(Exam).find(exam);
        
    if (examAlreadyExists[0]) {
        return true;
    } else {
        await getRepository(Exam).insert(exam);
        return false;
    }
}

export { createExam };