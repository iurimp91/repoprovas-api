import { getRepository } from "typeorm";

import Teachers from "../entities/Teachers";
import { TeachersInterface } from "../interfaces/TeachersInterface";

async function findTeachers(): Promise<TeachersInterface[]> {
    const result: TeachersInterface[] = await getRepository(Teachers)
        .createQueryBuilder("teachers")
        .leftJoinAndSelect("teachers.exams", "exams")
        .leftJoinAndSelect("exams.categories", "categories")
        .orderBy("teachers.name")
        .getMany();
    // const result = await getRepository(Teachers).find({
    //     relations: ["categories", "subjects", "exams"]
    // });
    return result;
}

export { findTeachers };