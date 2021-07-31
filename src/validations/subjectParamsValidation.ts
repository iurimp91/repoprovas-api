import joi from "joi";

import { SubjectParams } from "../interfaces/SubjectParams";

export async function subjectParamsValidation(params: SubjectParams) {
    const schema = joi.object({
        subjectId: joi.number().integer().min(1).required()
    });

    const validParams: SubjectParams = await schema.validateAsync(params);

    return validParams.subjectId;
}