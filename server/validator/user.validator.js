import { body } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const registerValidator = [
    body("name")
        .not()
        .isEmpty()
        .withMessage("Name is required")
        .trim(),
    body("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async (email) => {
            let user = await User.findOne({ email });
            if (user) {
                return Promise.reject("User already exists")
            }
            return true;
        }),
    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .custom(password => {
            if (password.length < 9) {
                return Promise.reject("Password Must be al least 9 char long")
            }
            return true;
        })
]

export const loginValidator = [
    body("email")
        .not()
        .isEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email Address")
        .trim()
        .custom(async (email, { req }) => {
            let user = await User.findOne({ email });
            if (!user) {
                return Promise.reject("User does not exist")
            }
            return true
        }),
    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required")
        .custom(async (password, { req }) => {
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return Promise.reject("Wrong User")
            }
            let match = await bcrypt.compare(password, user.password);
            if (!match) {
                return Promise.reject("Password does not match.")
            }
            return true
        })
]