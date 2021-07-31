import { getRepository } from "typeorm";

import Teachers from "../entities/Teachers";
import { TeachersInterface } from "../interfaces/TeachersInterface";

async function findTeachersBySubject(subjectId: number): Promise<TeachersInterface[]> {
    // const result: TeachersInterface[] = await getRepository(Teachers)
    //     .createQueryBuilder("teachers")
    //     .leftJoinAndSelect("teachers.exams", "exams")
    //     .leftJoinAndSelect("exams.category", "categories")
    //     .leftJoinAndSelect("exams.subject", "subjects")
    //     .orderBy("teachers.name")
    //     .getMany();

    const result: TeachersInterface[] = await getRepository(Teachers)
        .createQueryBuilder("teachers")
        .leftJoinAndSelect("teachers.subjects", "subjects")
        .where("subjects.id = :subjectId", { subjectId })
        .orderBy("teachers.name")
        .getMany();
    
    return result;
}



export { findTeachersBySubject };