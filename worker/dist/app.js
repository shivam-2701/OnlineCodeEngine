import fs from "fs";
import "./config/rabbitmq.js";
import { client } from "./config/redis.js";
import { deleteFolder, execute } from "./utils.js";
const extensions = {
    cpp: "cpp",
    c: "c",
    java: "java",
    python3: "txt",
};
const runCode = async (apiBody, channel, msg) => {
    try {
        client.set(apiBody.folder.toString(), "Processing");
        const command = `docker run --rm --mount type=bind,source=.\\temp,target=/app,readonly=false -t compiler:v7a ${extensions[apiBody.lang]} ${apiBody.folder}/source.${extensions[apiBody.lang]} 5`;
        await fs.promises.writeFile(`./temp/${apiBody.folder}/output.txt`, "");
        const output = await execute(command);
        const data = await fs.promises.readFile(`./temp/${apiBody.folder}/output.txt`, "utf-8");
        let result = {
            output: data,
            stderr: output.stderr,
            status: output.stdout,
            submission_id: apiBody.folder,
        };
        console.log(result);
        deleteFolder(`./temp/${apiBody.folder}`);
        await client.setEx(apiBody.folder.toString(), 3600, JSON.stringify(result));
        channel.ack(msg);
    }
    catch (error) {
        console.log("Error", error);
        deleteFolder(`./temp/${apiBody.folder}`);
    }
};
export const createFiles = async (apiBody, ch, msg) => {
    try {
        await fs.promises.mkdir(`./temp/${apiBody.folder}`);
        await fs.promises.writeFile(`./temp/${apiBody.folder}/input.txt`, apiBody.input);
        await fs.promises.writeFile(`./temp/${apiBody.folder}/source.${extensions[apiBody.lang]}`, apiBody.src);
        runCode(apiBody, ch, msg);
    }
    catch (error) {
        console.log(error);
        deleteFolder(`./temp/${apiBody.folder}`);
    }
};
//# sourceMappingURL=app.js.map