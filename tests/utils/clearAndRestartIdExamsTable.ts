import { getConnection } from "typeorm";
import Exams from "../../src/entities/Exams";

export default async function clearAndRestartIdExamsTable() {
    await getConnection().getRepository(Exams).clear();
    await getConnection().query(`ALTER SEQUENCE exams_id_seq RESTART WITH 1`);
}