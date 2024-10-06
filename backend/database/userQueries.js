import pool from "../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function getUsers() {
  const [rows] = await pool.query(
    `
    SELECT * FROM user
    `
  );
  return rows;
}

export async function getUserById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM user WHERE id = ?
    `, 
    [id]
  );
  return rows[0];
}

export async function createUser(name, rut, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const [result] = await pool.query(
    `
    INSERT INTO user (name, rut, email, password) VALUES (?, ?, ?, ?)
    `,
    [name, rut, email, hashedPassword]
  );
  return getUserById(result.insertId);
}

export async function updateUser(id, name, rut, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await pool.query(
    `
    UPDATE user SET name = ?, rut = ?, email = ?, password = ?
    WHERE id = ?
    `,
    [name, rut, email, hashedPassword, id]
  );
  return getUserById(id);
}

export async function deleteUser(id) {
  await pool.query(
    `
    DELETE FROM user WHERE id = ?
    `,
    [id]
  );
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
