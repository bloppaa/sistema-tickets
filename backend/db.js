import mysql from "mysql2";
import "dotenv/config";
import userQueries from "./database/userQueries.js";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

const [rows] = await pool.query(userQueries.getUsers);
console.log(rows);
