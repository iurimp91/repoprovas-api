import ExamInterface from "../../src/interfaces/ExamInterface";

export default function createBody(
        year: number,
        semester: number,
        categoryId: number,
        subjectId: number,
        teacherId: number,
        link: string
    ): ExamInterface {
    return {
        year: year,
        semester: semester,
        categoryId: categoryId,
        subjectId: subjectId,
        teacherId: teacherId,
        link: link,
    };
}