import { Request, Response } from "express";
import { CategoriesInterface } from "../interfaces/CategoriesInterface";

import * as categoriesService from "../services/categoriesService";


async function getCategories(req: Request, res: Response): Promise<Response<CategoriesInterface[]>> {
    try {
        const categories = await categoriesService.findCategories();
        
        return res.send(categories);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getCategories };