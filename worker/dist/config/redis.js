import { createClient } from "redis";
const client = createClient();
await client.connect();
client.on("error", (err) => {
    console.log("Error in redis:worker", err);
});
export { client };
//# sourceMappingURL=redis.js.map