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

export const successResponse = (data: string | Record<string, any>) => {
  return {
    status: "ok",
    data: data,
  };
};

export const deleteFromRedis = async (key: string) => {
  try {
    const status = await client.del(key);
    return status === 1;
  } catch (error) {
    console.log("Error in deleteKey:server", error);
    return false;
  }
}


export const getFromRedis = async (key: any) => {
  try {
    const value = await client.get(key);
    console.log(value);
    return value;
  } catch (err) {
    console.log("Error in getKey:server", err);
    return null;
  }
};
