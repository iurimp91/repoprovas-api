import joi from "joi";

import { StandardParams } from "../interfaces/StandardParams";

export async function standardParamsValidation(params: StandardParams) {
    const schema = joi.object({
        id: joi.number().integer().min(1).required()
    });

    const validParams: StandardParams = await schema.validateAsync(params);

    return validParams.id;
}