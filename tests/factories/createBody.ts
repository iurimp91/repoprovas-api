export default function createBody(
        year: number,
        semester: number,
        category: number,
        subject: number,
        teacher: number,
        link: string
    ) {
    return {
        year,
        semester,
        category,
        subject,
        teacher,
        link,
    };
}