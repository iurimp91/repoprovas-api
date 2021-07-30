export interface ExamInterface {
    year: number,
    semester: number,
    categoryId: number,
    subjectId: number,
    teacherId: number,
    link: string,
}

export interface ReqParams {
    id: number,
}