// import pool from "../db.js";
// import bcrypt from "bcrypt";

// const saltRounds = 10;

// export async function getClients() {
//   const [rows] = await pool.query(
//     `
//     SELECT * FROM clients
//     `
//   );
//   return rows;
// }

// export async function getClientById(id) {
//   const [rows] = await pool.query(
//     `
//     SELECT * FROM clients WHERE id = ?
//     `,
//     [id]
//   );
//   return rows[0];
// }

// export async function createClient(name, rut, companyRut, email, password) {
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   const [result] = await pool.query(
//     `
//     INSERT INTO clients (name, rut, companyRut, email, password)
//     VALUES (?, ?, ?, ?, ?)
//     `,
//     [name, rut, companyRut, email, hashedPassword]
//   );
//   return getClientById(result.insertId);
// }

// export async function updateClient(id, name, rut, companyRut, email, password) {
//   const hashedPassword = await bcrypt.hash(password, saltRounds);
//   await pool.query(
//     `
//     UPDATE clients
//     SET name = ?, rut = ?, companyRut = ?, email = ?, password = ?
//     WHERE id = ?
//     `,
//     [name, rut, companyRut, email, hashedPassword, id]
//   );
//   return getClientById(id);
// }

// export async function deleteClient(id) {
//   await pool.query(
//     `
//     DELETE FROM clients WHERE id = ?
//     `, 
//     [id]
//   );
// }

// export default {
//   getClients,
//   getClientById,
//   createClient,
//   updateClient,
//   deleteClient,
// };
