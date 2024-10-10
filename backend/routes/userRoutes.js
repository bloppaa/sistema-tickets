import express from "express";
import { register } from "../controllers/userController.js";

const router = express.Router();

// router.get("/", userController.getUsers);
// router.get("/:id", userController.getUserById);
router.post("/", register);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

export default router;
