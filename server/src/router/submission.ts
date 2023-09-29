import { Router } from "express";
import passport from "passport";
import { getResult, submitCode } from "../controllers/submission.js";

const router = Router();

router.post(
    "/submit",
    passport.authenticate("jwt", { session: false }),
    submitCode
);

router.get(
    "/results/:id",
    passport.authenticate("jwt", { session: false }),
    getResult
);


export default router;