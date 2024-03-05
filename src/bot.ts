import express from "express";
import { Bot, webhookCallback } from "grammy";
import "dotenv/config";

const bot = new Bot(process.env.BOT_TOKEN || "");

bot.command("start", (ctx) => ctx.reply("Hello World!"))

if (process.env.NODE_ENV === "DEVELOPMENT") {
    bot.start();
} else {
    try {
        const port = 8000;
        const app = express();
        app.use(express.json());
        app.use(`/${bot.token}`, webhookCallback(bot, "express"));
        app.listen(port, () => console.log(`listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }

}