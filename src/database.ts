import { getConnectionManager } from "typeorm";

if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL.indexOf("sslmode=require") === -1) {
    process.env.DATABASE_URL += "?sslmode=require";
}

console.log(`${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/entities/*.*`);

export default async function connectDatabase() {
    const connectionManager = await getConnectionManager();
    const connection = connectionManager.create({
        name: "default",
        type: "postgres",
        url: "postgres://postgres:123456@localhost:5432/repoprovas_test",
        entities: [`${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/entities/*.*`],
        ssl: process.env.NODE_ENV === 'production'
    });

    await connection.connect();
    return connection;
}