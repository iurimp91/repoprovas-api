import { getRepository } from "typeorm";

import Categories from "../entities/Categories"
 
async function findCategories() {
    const result = await getRepository(Categories).find();
    return result;
}

export { findCategories };