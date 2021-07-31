import { Request, Response } from "express";
import { TeachersInterface } from "../interfaces/TeachersInterface";
import { SubjectParams } from "../interfaces/SubjectParams";
import { StandardParams } from "../interfaces/StandardParams";
import { subjectParamsValidation } from "../validations/subjectParamsValidation";
import { standardParamsValidation } from "../validations/standardParamsValidation";

import * as teachersService from "../services/teachersService";

async function getTeachersBySubject(req: Request, res: Response): Promise<Response<TeachersInterface[]>> {
    try {
        const params: SubjectParams = { subjectId: Number(req.params.subjectId) };
        const subjectId = await subjectParamsValidation(params);

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

async function getTeacherExams(req: Request, res: Response): Promise<Response<TeachersInterface[]>> {
    try {
        const params: StandardParams = { id: Number(req.params.id) };
        const id = await standardParamsValidation(params);

        const teacherExams = await teachersService.findTeacherExams(id);

        if (teacherExams.length === 0) {
            return res.sendStatus(404);
        } else {
            return res.send(teacherExams);
        }
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getTeachersBySubject, getTeachers, getTeacherExams };