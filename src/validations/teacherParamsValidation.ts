import joi from "joi";

import { TeacherParams } from "../interfaces/TeacherParams";

export async function teacherParamsValidation(params: TeacherParams) {
    const schema = joi.object({
        teacherId: joi.number().integer().min(1).required()
    });

    const validParams: TeacherParams = await schema.validateAsync(params);

    return validParams.teacherId;
}