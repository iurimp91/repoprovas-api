import { Request, Response } from "express";
import { examValidation } from "../validations/examValidation";

import * as examService from "../services/examService";
import * as subjectsService from "../services/subjectsService";
import { ExamsInterface } from "../interfaces/ExamInterface";

import { ReqParams } from "../interfaces/ReqParams";
import { reqParamsValidation } from "../validations/reqParamsValidation";

import Exams from "../entities/Exams";

async function postExam(req: Request, res: Response) {
    try {
        const exam: Exams = req.body;
        const validExam = await examValidation(exam);

        const checkTeacherSubject = await subjectsService.findSubjectAndTeacher(exam);

        if (checkTeacherSubject.length === 0) return res.sendStatus(400);

        const result = await examService.createExam(validExam);
        
        if (result) {
            return res.sendStatus(409);
        } else {
            return res.sendStatus(201);
        }
    } catch (e) {
        return sendError(e, res);    
    }
}

async function getExam(req: Request, res: Response): Promise<Response<ExamsInterface>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const id = await reqParamsValidation(params);

        const exam = await examService.findExam(id);

        if (!exam) {
            return res.sendStatus(404);
        } else {
            return res.send(exam);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

export { postExam, getExam };

function sendError(e: Error, res: Response): Response {
    console.log(e.message);
    if (
        e.message.includes("required")
        || e.message.includes("year")
        || e.message.includes("semester")
        || e.message.includes("teacher")
        || e.message.includes("subject")
        || e.message.includes("category")
        || e.message.includes("pattern")
        || e.message.includes("foreign")
    ) {
        return res.sendStatus(400);
    } else {
        return res.sendStatus(500);
    }
}