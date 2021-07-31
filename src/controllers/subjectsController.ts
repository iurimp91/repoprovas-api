import { Request, Response } from "express";

import * as subjectsService from "../services/subjectsService";
import { SubjectsInterface } from "../interfaces/SubjectsInterface";

async function getSubjects(req: Request, res: Response): Promise<Response<SubjectsInterface[]>> {
    try {
        const subjects = await subjectsService.findSubjects();
        
        return res.send(subjects);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
} 

export { getSubjects };