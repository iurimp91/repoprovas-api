import joi from "joi";
import dayjs from "dayjs";
import Exam from "../entities/Exam";

const currentYear = dayjs().year();
const linkRegEx = /^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/;

export async function examValidation(exam: Exam): Promise<Exam> {
    const schema = joi.object({
        year: joi.number().integer().min(2000).max(currentYear).required(),
        semester: joi.number().integer().min(1).max(2).required(),
        categoryId: joi.number().integer().min(1).required(),
        subjectId: joi.number().integer().min(1).required(),
        teacherId: joi.number().integer().min(1).required(),
        link: joi.string().pattern(linkRegEx).trim().required(),
    });

    const validSchema: Exam = await schema.validateAsync(exam);

    return validSchema;
}