import { Request, Response } from "express";
import Subjects from "../entities/Subjects";

import * as subjectsService from "../services/subjectsService";

async function getSubjects(req: Request, res: Response): Promise<Response<Subjects[]>> {
    try {
        const subjects = await subjectsService.findSubjects();
        
        return res.send(subjects);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getSubjects };

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