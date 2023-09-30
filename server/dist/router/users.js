import { Router } from "express";
import { signup, createSession, refreshToken } from "../controllers/users.js";
import submissionRouter from "./submission.js";
const router = Router();
router.post("/signup", signup);
// router.post("/signin");
router.post("/create-session", createSession);
router.post("/refresh", refreshToken);
router.use("/", submissionRouter);
export default router;
//# sourceMappingURL=users.js.map