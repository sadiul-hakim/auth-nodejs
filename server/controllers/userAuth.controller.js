import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
import { formatter } from "../utils/formatter.js";
dotenv.config()


const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY



export const register = async (req, res) => {
    const error = validationResult(req).formatWith(formatter);
    if (!error.isEmpty()) {
        return res.json({
            registered: false, ...error.mapped()
        })
    }
    try {
        let { name, email, password } = req.body;
        let user = new User({ name, email, password });
        let savedUser = await user.save();

        res.status(200).send({ registered: true, userId: savedUser._id, email: savedUser.email })
    } catch (error) {

    }
}

export const login = async (req, res) => {
    const error = validationResult(req).formatWith(formatter);
    if (!error.isEmpty()) {
        return res.json({
            loggedIn: false, ...error.mapped()
        })
    }
    try {
        let { email } = req.body;
        let user = await User.findOne({ email })

        let token = jwt.sign({ _id: user._id, email: user.email }, privateKey, { algorithm: "RS256" })
        res.status(200).send({ loggedIn: true, token, _id: user._id, email: user.email })

    } catch (error) {

    }
}

export const validate = async (req, res) => {


    let { token, email } = req.body;
    console.log(token, email)
    if (!token || !email) {
        return res.send({ counterfeit: true })
    }
    try {
        let user = jwt.verify(token, publicKey);
        console.log(user)
        if (user.email !== email) {
            return res.send({ counterfeit: true })
        }
        res.status(200).send({ counterfeit: false });
    } catch (error) {
        res.send({ counterfeit: true })
    }
}