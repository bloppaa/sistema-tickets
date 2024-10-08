import express from "express";
import clientController from "../controllers/clientController.js";

const router = express.Router();

router.get("/", clientController.getClients);
router.get("/:id", clientController.getClientById);
router.post("/", clientController.createClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

export default router;
