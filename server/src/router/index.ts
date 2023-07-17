import { Router } from "express";
const router = Router();
import userRouter from "../router/users.js";
router.use("/users", userRouter);

export default router;
