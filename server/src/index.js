import express from "express";
import CookieParser from "cookie-parser";
import dotenv from "dotenv";

import UserRouter from "../routes/userAuth.router.js";
import "../db/connect.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

app.use("/auth", UserRouter);

app.get((req, res) => {
    res.sendStatus(404);
})

app.use((err, req, res, next) => {
    console.log(err);
})

app.listen(process.env.PORT, () => {
    console.log("Listening to port " + process.env.PORT)
})