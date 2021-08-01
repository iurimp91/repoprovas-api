import { getRepository } from "typeorm";

import Teachers from "../entities/Teachers";
import { TeachersInterface } from "../interfaces/TeachersInterface";

async function findTeachersBySubject(subjectId: number): Promise<TeachersInterface[]> {
    const result: TeachersInterface[] = await getRepository(Teachers)
        .createQueryBuilder("teachers")
        .leftJoinAndSelect("teachers.subjects", "subjects")
        .where("subjects.id = :subjectId", { subjectId })
        .orderBy("teachers.name")
        .getMany();
    
    return result;
}

async function findTeachers(): Promise<TeachersInterface[]> {
    const result: TeachersInterface[] = await getRepository(Teachers)
        .createQueryBuilder("teachers")
        .leftJoinAndSelect("teachers.exams", "exams")
        .leftJoinAndSelect("exams.category", "categories")
        .leftJoinAndSelect("exams.subject", "subjects")
        .orderBy("teachers.name")
        .getMany();

    return result;
}

async function findTeacherById(id: number): Promise<TeachersInterface> {
    const result: TeachersInterface = await getRepository(Teachers)
        .findOne({ id });

    return result;
}

// async function findTeacherExams(id: number): Promise<TeachersInterface[]> {
//     const result: TeachersInterface[] = await getRepository(Teachers)
//         .createQueryBuilder("teachers")
//         .leftJoinAndSelect("teachers.exams", "exams")
//         .leftJoinAndSelect("exams.category", "categories")
//         .leftJoinAndSelect("exams.subject", "subjects")
//         .where("teachers.id = :id", { id })
//         .orderBy("teachers.name")
//         .getMany();

//     return result;
// }

export { findTeachersBySubject, findTeachers, findTeacherById };