import { Router, Response, Request } from "express";
import { signup, createSession } from "../controllers/users.js";
import submissionRouter from "./submission.js";
const router = Router();

router.post("/signup", signup);
// router.post("/signin");

router.post("/create-session", createSession);

router.post("/refresh");

router.use("/", submissionRouter);

export default router;
