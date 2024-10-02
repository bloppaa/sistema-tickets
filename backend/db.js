import mysql from "mysql2";
import "dotenv/config";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM user");
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
  return rows[0];
}

export async function createUser(name, rut, email, password) {
  const [result] = await pool.query(
    "INSERT INTO user (name, rut, email, password) VALUES (?, ?, ?, ?)",
    [name, rut, email, password]
  );
  return getUserById(result.insertId);
}
