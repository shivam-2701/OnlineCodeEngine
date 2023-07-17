import ampq from "amqplib";
import { createFiles } from "../app.js";
const QUEUE_NAME = "judge";
const rabbitUrl = process.env.RABBIT_SERVER || "amqp://localhost:5672";
const connect = async () => {
    try {
        const connection = await ampq.connect(rabbitUrl);
        connection.on("connect", function () {
            console.log("Connected!");
        });
        connection.on("disconnect", function (err) {
            console.log("Disconnected.", err);
        });
        const channelWrapper = await connection.createChannel();
        await channelWrapper.assertQueue(QUEUE_NAME);
        channelWrapper.consume(QUEUE_NAME, (data) => {
            let message = JSON.parse(data.content.toString());
            createFiles(message, channelWrapper, data);
        });
    }
    catch (error) {
        console.log(error);
    }
};
connect();
//# sourceMappingURL=rabbitmq.js.map