import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
import { SubjectsInterface } from "../interfaces/SubjectsInterface";
 
async function findSubjects(): Promise<SubjectsInterface[]> {
    const result: SubjectsInterface[] = await getRepository(Subjects).find();
    return result;
}

export { findSubjects };