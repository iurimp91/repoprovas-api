import { getRepository } from "typeorm";

import Categories from "../entities/Categories";

import { CategoriesInterface } from "../interfaces/CategoriesInterface";
 
async function findCategories(): Promise<CategoriesInterface[]> {
    const result = await getRepository(Categories).find();
    
    return result;
}

async function findCategoriesExamsByTeacher(teacherId: number): Promise<CategoriesInterface[] | boolean > {
     const result = await getRepository(Categories)
        .createQueryBuilder("categories")
        .leftJoinAndSelect("categories.exams", "exams")
        .leftJoinAndSelect("exams.subject", "subjects")
        .leftJoinAndSelect("exams.teacher", "teachers")
        .where("teachers.id = :teacherId", { teacherId })
        .orderBy("categories.id")
        .getMany();
    
    return result;
}

async function findCategoriesExamsBySubject(subjectId: number): Promise<CategoriesInterface[] | boolean > {
    const result = await getRepository(Categories)
       .createQueryBuilder("categories")
       .leftJoinAndSelect("categories.exams", "exams")
       .leftJoinAndSelect("exams.subject", "subjects")
       .leftJoinAndSelect("exams.teacher", "teachers")
       .where("subjects.id = :subjectId", { subjectId })
       .orderBy("categories.id")
       .getMany();
   
   return result;
}

export { findCategories, findCategoriesExamsByTeacher, findCategoriesExamsBySubject };