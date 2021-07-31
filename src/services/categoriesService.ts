import { getRepository } from "typeorm";

import Categories from "../entities/Categories"
import { CategoriesInterface } from "../interfaces/CategoriesInterface";
 
async function findCategories(): Promise<CategoriesInterface[]> {
    const result = await getRepository(Categories).find();
    return result;
}

export { findCategories };