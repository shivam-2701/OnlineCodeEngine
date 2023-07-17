import { manualSync } from "rimraf";
import { exec } from "child_process";
import fs from "fs";
export const deleteFolder = (path) => {
    if (fs.existsSync(path)) {
        return manualSync(path);
    }
    else {
        return;
    }
};
export const execute = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err.message);
                reject(err);
            }
            else {
                let status = { stdout: stdout, stderr: stderr };
                resolve(status);
            }
        });
    });
};
//# sourceMappingURL=utils.js.map