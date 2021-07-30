import { Request, Response } from "express";
import Categories from "../entities/Categories";

import * as categoriesService from "../services/categoriesService";

async function getCategories(req: Request, res: Response): Promise<Response<Categories[]>> {
    try {
        const categories = await categoriesService.findCategories();
        
        return res.send(categories);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getCategories };

// function sendError(e: Error, res: Response): Response {
//     console.log(e.message);
//     if (
//         e.message.includes("required")
//         || e.message.includes("year")
//         || e.message.includes("semester")
//         || e.message.includes("teacher")
//         || e.message.includes("subject")
//         || e.message.includes("category")
//         || e.message.includes("pattern")
//         || e.message.includes("foreign")
//     ) {
//         return res.sendStatus(400);
//     } else if (e.message.includes("duplicate")) {
//         return res.sendStatus(409);
//     } else {
//         return res.sendStatus(500);
//     }
// }