import { getRepository } from "typeorm";

import Subjects from "../entities/Subjects"
 
async function findSubjects() {
    const result = await getRepository(Subjects).find();
    return result;
}

export { findSubjects };