import { client } from "../config/redis.js";

export const errorResponse = (code: number, message: string) => {
  return {
    status: "error",
    data: null,
    error: {
      code: code,
      message: message,
    },
  };
};

export const successResponse = (data: string) => {
  return {
    status: "ok",
    data: data,
  };
};

export const getFromRedis = async (key) => {
  try {
    return await client.get(key);
  } catch (err) {
    console.log("Error in getKey:server", err);
    return null;
  }
};
