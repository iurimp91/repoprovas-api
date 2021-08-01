import { Request, Response } from "express";
import { CategoriesInterface } from "../interfaces/CategoriesInterface";

import * as categoriesService from "../services/categoriesService";
import * as teachersService from "../services/teachersService";

import { TeacherParams } from "../interfaces/TeacherParams";

import { teacherParamsValidation } from "../validations/teacherParamsValidation";

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
        const params: TeacherParams = { teacherId: Number(req.params.teacherId) };
        const teacherId = await teacherParamsValidation(params);

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

export { getCategories, getCategoriesExamsByTeacher };