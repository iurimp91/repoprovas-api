import { Request, Response } from "express";
import Subjects from "../entities/Subjects";

import { ReqParams } from "../interfaces/interfaces";
import { paramsValidation } from "../validations/paramsValidation";

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

async function getSubjectsById(req: Request, res: Response): Promise<Response<Subjects[]>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const id = await paramsValidation(params);

        const subjects = await subjectsService.findSubjectsById(id);
        
        return res.send(subjects);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getSubjects, getSubjectsById };