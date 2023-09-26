import { createServer } from "https";
import { readFileSync } from "fs";
import express from "express";
import cors from "cors";
import { setupDbConnection } from "./config/mongoose.js";
import { setupPassportJWT } from "./config/passport-jwt.js";
import bodyParser from "body-parser";
import router from "./router/index.js";
const app = express();
const port = 5000;
// Setting up middleWare
/*  Bodyparser*/
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", router);
setupDbConnection();
setupPassportJWT();
const options = {
    key: readFileSync("./server.key"),
    cert: readFileSync("./server.cert"),
};
createServer(options, app).listen(port, () => console.log("Server running on port " + port));
/*
app.listen(port, () => {
  console.log(
    `Typescript!!!! Server is running on port http://localhost:${port}`
  );
  });
*/
//# sourceMappingURL=app.js.map