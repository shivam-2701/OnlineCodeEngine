import { createUser, getUserByEmail } from "../models/users.js";
import { authentication, random } from "../helper/index.js";
import { config } from "dotenv";
config();
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                msg: "Kindly fill all the required parameters email ,username ,password",
            });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res
                .status(400)
                .json({
                msg: "User's email existing!! Try Signing in",
            })
                .end();
        }
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(501);
    }
};
export const createSession = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email).select(" +authentication.salt +authentication.password");
        if (!user) {
            return res
                .status(422)
                .json({
                message: "Invalid email or password",
            })
                .end();
        }
        const passwordHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== passwordHash) {
            return res
                .status(422)
                .json({
                message: "Invalid email or password",
            })
                .end();
        }
        const JWTtoken = jwt.sign({ username: user.username, id: user._id, emial: user.email }, process.env.JWT_SECRET);
        res
            .json({
            message: "Login successfully",
            "bearer-token": JWTtoken,
        })
            .end();
    }
    catch (error) {
        console.log("Error in creating session", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
//# sourceMappingURL=users.js.map