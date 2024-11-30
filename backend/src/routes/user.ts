import express from "express"
import zod from "zod"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { Users } from "../models";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string

export const userRouter = express.Router();


const signupSchema = zod.object({
    username: zod.string().min(3, "Username is required").max(10, "Username should be maximum of 10 characters"),
    password: zod.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
    )
})

const signinSchema = zod.object({
    username: zod.string().min(3, "Username is required").max(10, "Username should be maximum of 10 characters"),
    password: zod.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
    )
})
// @ts-ignore
userRouter.post("/signup", async (req, res) => {
    //@ts-ignore    
    const body = req.body;
    const valid = signupSchema.safeParse(body);
        if (!valid.success) {
            const errorMessages = valid.error.errors.map(error => error.message);
            return res.status(411).json({
                error: errorMessages
            }) 
        }
    try {
        const userExists = await Users.findOne({
            // @ts-ignore
            username: body.username
        })
        if (userExists) {
            return res.status(403).json({
                message: "User already exists with the username"
            })
        }

        await Users.create({
            // @ts-ignore
            username: body.username,
            // @ts-ignore
            password: body.password
        })
        return res.status(200).json({
            message: "Signed up succesfully"
        })
    } catch(e) {
        res.status(500).json({
            message: "Server Error"
        })
    }
})

//@ts-ignore
userRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const valid = signinSchema.safeParse(body);
    if (!valid.success) {
        const errorMessages = valid.error.errors.map(error => error.message);
        return res.status(411).json({
            message: errorMessages
        })
    }
    try {
        const existingUser = await Users.findOne({
            username: body.username,
            password: body.password
        })

        if (existingUser) {
            const token = jwt.sign({
                id : existingUser._id
            }, JWT_SECRET);
            return res.status(200).json({
                message: "Signed in successfully",
                token: token
            })
        } else {
            return res.status(403).json({
                message: "Wrong credentials"
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})