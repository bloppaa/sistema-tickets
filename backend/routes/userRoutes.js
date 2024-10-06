import express from "express";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

// // Campos requeridos para métodos POST y PUT
// const requiredFields = ["name", "rut", "email", "password"];

// // Obtener todos los usuarios
// router.get("/", async (req, res, next) => {
//   try {
//     const users = await userQueries.getUsers();
//     return res.status(200).send(users);
//   } catch (error) {
//     next(error);
//   }
// });

// // Buscar usuario por id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const user = await userQueries.getUserById(req.params.id);

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     return res.status(200).send(user);
//   } catch (error) {
//     next(error);
//   }
// });

// // Crear usuario
// router.post("/", async (req, res, next) => {
//   // Verificar que se envíen todos los campos requeridos
//   if (!requiredFields.every((field) => req.body[field])) {
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     // Evitar que se asignen campos adicionales
//     const user = await userQueries.createUser(
//       req.body.name,
//       req.body.rut,
//       req.body.email,
//       req.body.password
//     );

//     return res.status(201).send({ message: "User created", user: user });
//   } catch (error) {
//     next(error);
//   }
// });

// // Actualizar usuario
// router.put("/:id", async (req, res, next) => {
//   // Verificar que se envíen todos los campos requeridos
//   if (!requiredFields.every((field) => req.body[field])) {
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     // Evitar que se asignen campos adicionales
//     const user = await userQueries.updateUser(
//       req.params.id,
//       req.body.name,
//       req.body.rut,
//       req.body.email,
//       req.body.password
//     );

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     return res.status(200).send({ message: "User updated", user: user });
//   } catch (error) {
//     next(error);
//   }
// });

// // Eliminar usuario
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const user = await userQueries.getUserById(req.params.id);

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     await userQueries.deleteUser(req.params.id);

//     res.status(200).send({ message: "User deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
