import express from "express";
import clientQueries from "../database/clientQueries.js";

const router = express.Router();

// Campos requeridos para métodos POST y PUT
const requiredFields = ["name", "rut", "companyRut", "email", "password"];

// Obtener todos los clientes
router.get("/", async (req, res) => {
  const clients = await clientQueries.getClients();
  return res.status(200).send(clients);
});

// Buscar cliente por id
router.get("/:id", async (req, res) => {
  const client = await clientQueries.getClientById(req.params.id);

  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }

  return res.status(200).send(client);
});

// Crear cliente
router.post("/", async (req, res) => {
  if (!requiredFields.every((field) => req.body[field])) {
    return res.status(400).send({ message: "missing required fields" });
  }

  const client = await clientQueries.createClient(
    req.body.name,
    req.body.rut,
    req.body.companyRut,
    req.body.email,
    req.body.password
  );

  return res.status(201).send({ message: "client created", client: client });
});

// Actualizar cliente
router.put("/:id", async (req, res) => {
  if (!requiredFields.every((field) => req.body[field])) {
    return res.status(400).send({ message: "missing required fields" });
  }

  const client = await clientQueries.updateClient(
    req.params.id,
    req.body.name,
    req.body.rut,
    req.body.companyRut,
    req.body.email,
    req.body.password
  );

  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }

  return res.status(200).send({ message: "client updated", client: client });
});

// Eliminar client
router.delete("/:id", async (req, res) => {
  const client = await clientQueries.getClientById(req.params.id);

  if (!client) {
    return res.status(404).send({ message: "client not found" });
  }

  await clientQueries.deleteClient(req.params.id);

  return res.status(200).send({ message: "client deleted" });
});

export default router;
