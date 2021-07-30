import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
 
async function findSubjects() {
    const result = await getRepository(Subjects).find();
    return result;
}

async function findSubjectsById(id: number) {
    const result = await getRepository(Subjects).findByIds([id], {relations: ["teachers"]});
    
    return result;
}

export { findSubjects, findSubjectsById };