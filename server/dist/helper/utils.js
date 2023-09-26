import { client } from "../config/redis.js";
export const errorResponse = (code, message) => {
    return {
        status: "error",
        data: null,
        error: {
            code: code,
            message: message,
        },
    };
};
export const successResponse = (data) => {
    return {
        status: "ok",
        data: data,
    };
};
export const getFromRedis = async (key) => {
    try {
        const value = await client.get(key);
        console.log(value);
        return value;
    }
    catch (err) {
        console.log("Error in getKey:server", err);
        return null;
    }
};
//# sourceMappingURL=utils.js.map