// import express from "express";
// import clientQueries from "../database/clientQueries.js";

// const router = express.Router();

// // Campos requeridos para métodos POST y PUT
// const requiredFields = ["name", "rut", "companyRut", "email", "password"];

// // Obtener todos los clientes
// router.get("/", async (req, res, next) => {
//   try {
//     const clients = await clientQueries.getClients();
//     return res.status(200).send(clients);
//   } catch (error) {
//     next(error);
//   }
// });

// // Buscar cliente por id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const client = await clientQueries.getClientById(req.params.id);

//     if (!client) {
//       return res.status(404).send({ message: "Client not found" });
//     }

//     return res.status(200).send(client);
//   } catch (error) {
//     next(error);
//   }
// });

// // Crear cliente
// router.post("/", async (req, res, next) => {
//   if (!requiredFields.every((field) => req.body[field])) {
//     // Verificar que se envíen todos los campos requeridos
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     // Evitar que se asignen campos adicionales
//     const client = await clientQueries.createClient(
//       req.body.name,
//       req.body.rut,
//       req.body.companyRut,
//       req.body.email,
//       req.body.password
//     );

//     return res.status(201).send({ message: "Client created", client: client });
//   } catch (error) {
//     next(error);
//   }
// });

// // Actualizar cliente
// router.put("/:id", async (req, res, next) => {
//   // Verificar que se envíen todos los campos requeridos
//   if (!requiredFields.every((field) => req.body[field])) {
//     return res.status(400).send({ message: "Missing required fields" });
//   }

//   try {
//     // Evitar que se asignen campos adicionales
//     const client = await clientQueries.updateClient(
//       req.params.id,
//       req.body.name,
//       req.body.rut,
//       req.body.companyRut,
//       req.body.email,
//       req.body.password
//     );

//     if (!client) {
//       return res.status(404).send({ message: "Client not found" });
//     }

//     return res.status(200).send({ message: "Client updated", client: client });
//   } catch (error) {
//     next(error);
//   }
// });

// // Eliminar client
// router.delete("/:id", async (req, res, next) => {
//   try {
//     const client = await clientQueries.getClientById(req.params.id);

//     if (!client) {
//       return res.status(404).send({ message: "Client not found" });
//     }

//     await clientQueries.deleteClient(req.params.id);

//     return res.status(200).send({ message: "Client deleted" });
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;
