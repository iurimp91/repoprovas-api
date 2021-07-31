import { Request, Response } from "express";

import { ReqParams } from "../interfaces/ReqParams";
import { paramsValidation } from "../validations/paramsValidation";

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

async function getSubjectsById(req: Request, res: Response): Promise<Response<SubjectsInterface[]>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const id = await paramsValidation(params);

        const subjects = await subjectsService.findSubjectsById(id);

        if (subjects[0]) {
            return res.send(subjects);    
        } else {
            return res.sendStatus(404);
        }
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getSubjects, getSubjectsById };