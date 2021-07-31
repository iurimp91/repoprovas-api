import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
import { SubjectsInterface } from "../interfaces/SubjectsInterface";
 
async function findSubjects(): Promise<SubjectsInterface[]> {
    const result: SubjectsInterface[] = await getRepository(Subjects).find();
    return result;
}

async function findSubjectsById(id: number): Promise<SubjectsInterface[]> {
    const result: SubjectsInterface[] = await getRepository(Subjects).findByIds([id], {relations: ["teachers"]});
    return result;
}

export { findSubjects, findSubjectsById };