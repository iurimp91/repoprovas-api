import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
import { SubjectsInterface } from "../interfaces/SubjectsInterface";
 
async function findSubjects(): Promise<SubjectsInterface[]> {
    const result: SubjectsInterface[] = await getRepository(Subjects)
        .createQueryBuilder("subjects")
        .orderBy("subjects.name")
        .getMany();
        
    return result;
}

export { findSubjects };