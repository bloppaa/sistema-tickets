import pool from "../db.js";

export async function getClients() {
  const [rows] = await pool.query(
    `
    SELECT * FROM client
    `
  );
  return rows;
}

export async function getClientById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM client WHERE id = ?
    `,
    [id]
  );
  return rows[0];
}

export async function createClient(name, rut, companyRut, email, password) {
  const [result] = await pool.query(
    `
    INSERT INTO client (name, rut, companyRut, email, password)
    VALUES (?, ?, ?, ?, ?)
    `,
    [name, rut, companyRut, email, password]
  );
  return getClientById(result.insertId);
}

export async function updateClient(id, name, rut, companyRut, email, password) {
  await pool.query(
    `
    UPDATE client
    SET name = ?, rut = ?, companyRut = ?, email = ?, password = ?
    WHERE id = ?
    `,
    [name, rut, companyRut, email, password, id]
  );
  return getClientById(id);
}

export async function deleteClient(id) {
  await pool.query(
    `
    DELETE FROM client WHERE id = ?
    `, 
    [id]
  );
}

export default {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
