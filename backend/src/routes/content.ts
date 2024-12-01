import express from "express"
import  jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authMiddleware } from "../middleware";
import { Contents, Links, Tags } from "../models";
import { random } from "../utils";

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

// @ts-ignore
contentRouter.post("/share", authMiddleware, async (req, res) => {
    const share = req.body.share;
    try {
        if (share) {
            const link = random(10);
            const existingLink = await Links.findOne({
                // @ts-ignore
                userId: req.userId
            });
            
            if (existingLink) {
                return res.json({
                    message: "/share/" + existingLink.hash
                })
            } else {
                await Links.create({
                    // @ts-ignore
                    userId: req.userId,
                    hash: link
                })
                return res.status(200).json({
                    message: "/share/" + link
                })
            }

        } else {
            await Links.deleteOne({
                // @ts-ignore
                userId: req.userId
            })

            return res.status(401).json({
                message: "Removed link"
            })
        }
    } catch(e) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

// @ts-ignore
contentRouter.get("/brain/:shareLink", async(req, res) => {
    const link = req.params.shareLink;
    try {
        const existLink = await Links.findOne({
            hash: link
        })
        if (!existLink) {
            return res.status(400).json({
                message: "Link is broken"
            })
        } else {
            const content = await Contents.findOne({
                userId: existLink.userId
            }).populate("userId", "username");
            
            return res.status(200).json({
                mesage: content
            })
        }
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            // @ts-ignore
            error: e.message
        })
    }
})