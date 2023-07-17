import crypto from "crypto";
import { config } from "dotenv";
config();
const SECRET = process.env.SECRET;
export const authentication = (salt, password) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(SECRET)
        .digest("hex");
};
export const random = () => {
    return crypto.randomBytes(128).toString("base64");
};
//# sourceMappingURL=index.js.map