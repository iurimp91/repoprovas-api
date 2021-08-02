import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
import { SubjectsInterface } from "../interfaces/SubjectsInterface";

import Exams from "../entities/Exams";
 
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

async function findSubjectAndTeacher(exam: Exams) {
    const { subject, teacher } = exam;
    
    const result = await getRepository(Subjects)
        .createQueryBuilder("subjects")
        .leftJoinAndSelect("subjects.teachers", "teachers")
        .where("subjects.id = :subject", { subject })
        .andWhere("teachers.id = :teacher", { teacher })
        .getMany();

    return result;
}

export { findSubjects, findSubjectById, findSubjectAndTeacher };