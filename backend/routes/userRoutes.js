import express from "express";
import userQueries from "../database/userQueries.js";

const router = express.Router();

// Campos requeridos para métodos POST y PUT
const requiredFields = ["name", "rut", "email", "password"];

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  const users = await userQueries.getUsers();
  return res.status(200).send(users);
});

// Buscar usuario por id
router.get("/:id", async (req, res) => {
  const user = await userQueries.getUserById(req.params.id);

  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }

  return res.status(200).send(user);
});

// Crear usuario
router.post("/", async (req, res) => {
  // Verificar que se envíen todos los campos requeridos
  if (!requiredFields.every((field) => req.body[field])) {
    return res.status(400).send({ message: "missing required fields" });
  }

  // Evitar que se asignen campos adicionales
  const user = await userQueries.createUser(
    req.body.name,
    req.body.rut,
    req.body.email,
    req.body.password
  );

  return res.status(201).send({ message: "user created", user: user });
});

// Actualizar usuario
router.put("/:id", async (req, res) => {
  // Verificar que se envíen todos los campos requeridos
  if (!requiredFields.every((field) => req.body[field])) {
    return res.status(400).send({ message: "missing required fields" });
  }

  // Evitar que se asignen campos adicionales
  const user = await userQueries.updateUser(
    req.params.id,
    req.body.name,
    req.body.rut,
    req.body.email,
    req.body.password
  );

  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }

  return res.status(200).send({ message: "user updated", user: user });
});

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  const user = await userQueries.getUserById(req.params.id);

  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }

  await userQueries.deleteUser(req.params.id);

  res.status(200).send({ message: "user deleted" });
});

export default router;
