import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Register
// http://localhost:3002/api/auth/register
router.post("/register", register);

// Login
// http://localhost:3002/api/auth/login
router.post("/login", login);

// GetMe
// http://localhost:3002/api/auth/me
router.get("/me", checkAuth, getMe); // checkAuth - is a middleware, which checks token

export default router;
