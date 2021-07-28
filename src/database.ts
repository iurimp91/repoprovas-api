import pg from "pg";

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default connection;

// user: process.env.BD_USER,
// password: process.env.BD_PASSWORD,
// port: Number(process.env.BD_PORT),
// host: process.env.BD_HOST,
// database: process.env.BD_DATABASE,