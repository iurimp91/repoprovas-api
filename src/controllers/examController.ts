import { Request, Response } from "express";
import ExamInterface from "../interfaces/ExamInterface";
import { examValidation } from "../validations/examValidation";

import * as examService from "../services/examService";

async function postExam(req: Request, res: Response) {
    try {
        const exam: ExamInterface = req.body;
        const validExam = await examValidation(exam);
        
        await examService.createExam(validExam);
        
        return res.sendStatus(201);
    } catch (e) {
        return sendError(e, res);    
    }
}

export { postExam };

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
    } else if (e.message.includes("duplicate")) {
        return res.sendStatus(409);
    } else {
        return res.sendStatus(500);
    }
}