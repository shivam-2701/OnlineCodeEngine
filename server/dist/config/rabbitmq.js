import amqp from "amqplib";
import dotenv from "dotenv";
dotenv.config();
const QUEUE_NAME = "judge";
const rabbitUrl = process.env.RABBIT_SERVER || "amqp://localhost:5672";
const connection = await amqp.connect(rabbitUrl);
connection.on("connect", () => {
    console.log("Connected to RabbitMQ");
});
connection.on("disconnect", function (err) {
    console.log("Disconnected. from RabbitMQ", err);
});
const channelWrapper = await connection.createChannel();
export const sendMessage = async (data) => {
    await channelWrapper.assertQueue(QUEUE_NAME, { durable: true });
    if (channelWrapper.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)))) {
        // console.log(data);
        console.log("Message sent successfully");
    }
    return;
};
//# sourceMappingURL=rabbitmq.js.map