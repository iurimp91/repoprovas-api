import { Request, Response } from "express";
import Teachers from "../entities/Teachers";

import * as teachersService from "../services/teachersService";

async function getTeachers(req: Request, res: Response): Promise<Response<Teachers[]>> {
    try {
        const teachers = await teachersService.findTeachers();
        
        return res.send(teachers);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(500);
    }
}

export { getTeachers };