import { Request, Response } from "express";
import { CategoriesInterface } from "../interfaces/CategoriesInterface";

import * as categoriesService from "../services/categoriesService";
import * as teachersService from "../services/teachersService";
import * as subjectsService from "../services/subjectsService";

import { ReqParams } from "../interfaces/ReqParams";
import { reqParamsValidation } from "../validations/reqParamsValidation";

async function getCategories(req: Request, res: Response): Promise<Response<CategoriesInterface[]>> {
    try {
        const categories = await categoriesService.findCategories();
        
        return res.send(categories);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

async function getCategoriesExamsByTeacher(req: Request, res: Response): Promise<Response<CategoriesInterface[]>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const teacherId = await reqParamsValidation(params);

        const findTeacher = await teachersService.findTeacherById(teacherId);
        
        if (findTeacher === undefined) {
            return res.sendStatus(404);
        } else {
            const categoriesExams = await categoriesService.findCategoriesExamsByTeacher(teacherId);
            
            return res.send({
                teacherName: findTeacher.name,
                examsByCategory: categoriesExams,
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

async function getCategoriesExamsBySubject(req: Request, res: Response): Promise<Response<CategoriesInterface[]>> {
    try {
        const params: ReqParams = { id: Number(req.params.id) };
        const subjectId = await reqParamsValidation(params);

        const findSubject = await subjectsService.findSubjectById(subjectId);
        
        if (findSubject === undefined) {
            return res.sendStatus(404);
        } else {
            const categoriesExams = await categoriesService.findCategoriesExamsBySubject(subjectId);
            
            return res.send({
                subjectName: findSubject.name,
                examsByCategory: categoriesExams,
            });
        }
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getCategories, getCategoriesExamsByTeacher, getCategoriesExamsBySubject };