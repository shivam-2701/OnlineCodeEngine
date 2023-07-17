import { Router } from "express";
import { signup, createSession } from "../controllers/users.js";
import { submitCode, getResult } from "../controllers/submission.js";
import passport from "passport";
const router = Router();
router.post("/signup", signup);
// router.post("/signin");
router.post("/create-session", createSession);
router.post("/submit", passport.authenticate("jwt", { session: false }), submitCode);
router.get("/results/:id", passport.authenticate("jwt", { session: false }), getResult);
export default router;
//# sourceMappingURL=users.js.map