import { getRepository } from "typeorm";

import Teachers from "../entities/Teachers"
 
async function findTeachers() {
    const result = await getRepository(Teachers).find();
    return result;
}

export { findTeachers };