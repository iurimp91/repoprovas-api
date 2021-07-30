import joi from "joi";

import { ReqParams } from "../interfaces/interfaces";

export async function paramsValidation(params: ReqParams) {
    const schema = joi.object({
        id: joi.number().integer().min(1).required()
    });

    const validParams: ReqParams = await schema.validateAsync(params);

    return validParams.id;
}