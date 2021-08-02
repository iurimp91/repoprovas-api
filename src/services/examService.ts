import { getRepository } from "typeorm";

import Exams from "../entities/Exams";
import { ExamsInterface } from "../interfaces/ExamInterface";
 
async function createExam(exam: Exams) {
    const examAlreadyExists = await getRepository(Exams).find(exam);
        
    if (examAlreadyExists[0]) {
        return true;
    } else {        
        await getRepository(Exams).insert(exam);
        return false;
    }
}

async function findExam(id: number) {
    const result = await getRepository(Exams)
        .createQueryBuilder("exams")
        .leftJoinAndSelect("exams.category", "categories")
        .leftJoinAndSelect("exams.subject", "subjects")
        .leftJoinAndSelect("exams.teacher", "teachers")
        .where("exams.id = :id", { id })
        .orderBy("categories.id")
        .getOne();

    return result;
}

export { createExam, findExam };