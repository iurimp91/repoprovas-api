import { getRepository } from "typeorm";

import Exams from "../entities/Exams";
import { ExamsInterface } from "../interfaces/ExamInterface";
 
async function createExam(exam: ExamsInterface) {
    const examAlreadyExists = await getRepository(Exams).find(exam);
        
    if (examAlreadyExists[0]) {
        return true;
    } else {        
        await getRepository(Exams).insert(exam);
        return false;
    }
}

export { createExam };