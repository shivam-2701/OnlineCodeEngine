import mongoose from "mongoose";
export const setupDbConnection = (): void => {
  mongoose.connect("mongodb://localhost:27017/judge-db");

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
};
