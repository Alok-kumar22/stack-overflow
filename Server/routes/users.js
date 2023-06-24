import express from "express";
import { login, signup } from "../controller/auth.js";
import { getAllUsers, updateProfile } from "../controller/users.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", updateProfile);
export default router;
