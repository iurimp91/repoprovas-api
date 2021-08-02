import joi from "joi";
import dayjs from "dayjs";
import { ExamsInterface } from "../interfaces/ExamInterface";

import Exams from "../entities/Exams";

const currentYear = dayjs().year();
const linkRegEx = /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/;

export async function examValidation(exam: Exams): Promise<Exams> {
    const schema = joi.object({
        year: joi.number().integer().min(2000).max(currentYear).required(),
        semester: joi.number().integer().min(1).max(2).required(),
        category: joi.number().integer().min(1).required(),
        subject: joi.number().integer().min(1).required(),
        teacher: joi.number().integer().min(1).required(),
        link: joi.string().pattern(linkRegEx).trim().required(),
    });

    const validSchema: Exams = await schema.validateAsync(exam);

    return validSchema;
}