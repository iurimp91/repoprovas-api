import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
import { SubjectsInterface } from "../interfaces/SubjectsInterface";
 
async function findSubjects(): Promise<SubjectsInterface[]> {        
    const result: SubjectsInterface[] = await getRepository(Subjects)
        .createQueryBuilder("subjects")
        .leftJoinAndSelect("subjects.exams", "exams")
        .orderBy("subjects.name")
        .getMany();

    return result;
}

async function findSubjectById(id: number): Promise<SubjectsInterface> {
    const result: SubjectsInterface = await getRepository(Subjects)
        .findOne({ id });

    return result;
}

export { findSubjects, findSubjectById };