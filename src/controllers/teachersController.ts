import { Request, Response } from "express";
import { TeachersInterface } from "../interfaces/TeachersInterface";

import * as teachersService from "../services/teachersService";

async function getTeachers(req: Request, res: Response): Promise<Response<TeachersInterface[]>> {
    try {
        const teachers = await teachersService.findTeachers();
        
        return res.send(teachers);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getTeachers };