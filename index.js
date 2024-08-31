import express from "express";
import connectDB from "./DB/connection.js";
import dotenv from "dotenv";
import { appRouter } from "./src/app.router.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

await connectDB();
appRouter(express, app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
