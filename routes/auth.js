import express from "express";
import auth from "../controllers/auth.js";

const router = express.Router();



router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout",auth.loginRequired, auth.logout);
router.get("/profile",auth.loginRequired, auth.profile);

export default router; 