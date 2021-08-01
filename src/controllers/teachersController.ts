import { Request, Response } from "express";
import { TeachersInterface } from "../interfaces/TeachersInterface";

import { ReqParams } from "../interfaces/ReqParams";
import { reqParamsValidation } from "../validations/reqParamsValidation";

import * as teachersService from "../services/teachersService";

async function getTeachersBySubject(req: Request, res: Response): Promise<Response<TeachersInterface[]>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const subjectId = await reqParamsValidation(params);

        const teachers = await teachersService.findTeachersBySubject(subjectId);
        
        if (teachers.length === 0) {
            return res.sendStatus(404);
        } else {
            return res.send(teachers);
        }
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

async function getTeachers(req: Request, res: Response): Promise<Response<TeachersInterface[]>> {
    try {
        const teachers = await teachersService.findTeachers();
        
        return res.send(teachers);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getTeachersBySubject, getTeachers };