import joi from "joi";

import { ReqParams } from "../interfaces/ReqParams";

export async function paramsValidation(params: ReqParams) {
    const schema = joi.object({
        subjectId: joi.number().integer().min(1).required()
    });

    const validParams: ReqParams = await schema.validateAsync(params);

    return validParams.subjectId;
}