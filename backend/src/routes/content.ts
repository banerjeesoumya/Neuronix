import express from "express"
import  jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authMiddleware } from "../middleware";
import { Contents, Tags } from "../models";

dotenv.config()

export const contentRouter = express.Router();

// @ts-ignore
contentRouter.post("/publish", authMiddleware, async (req, res) => {
    const body = req.body;
    try {
        const tagsId = await Promise.all(
            // @ts-ignore
            body.tags.map(async (tag) => {
                let existingTag = await Tags.findOne({
                    title: tag
                });
                if (!existingTag) {
                    existingTag = await Tags.create({
                        title: tag
                    })
                }
                return existingTag._id;
            })
        )
        const contentTypes = ['document', 'tweet', 'youtube', 'audio'];
        if (!contentTypes.includes(body.type)) {
            contentTypes.push(body.type);
        }
        // @ts-ignore
        const userId = req.userId;
        console.log(userId);
        await Contents.create({
            link:  body.link,
            type: body.type,
            title: body.title,
            tags: tagsId,
            // @ts-ignore
            userId: req.userId, 
        })
        return res.status(200).json({
            message : "Content added"
        })
    } catch (e) {
        return res.status(500).json({
            message: "Server error",
            // @ts-ignore
            error: e.message
        })
    }
})

// @ts-ignore
contentRouter.get("/myContent", authMiddleware, async (req, res) => {
    // @ts-ignore
    const userId  = req.userId;
    try {
        const content = await Contents.find({
            userId: userId
        }).populate("userId", "username");
        return res.status(200).json({
            message: content
        })
    } catch(e) {
        return res.status(500).json({
            message: "Server error",
            // @ts-ignore
            error: e.message
        })
    }
})
