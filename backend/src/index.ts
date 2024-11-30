import express from "express"
import dotenv from "dotenv"
import { userRouter } from "./routes/user";
import { contentRouter } from "./routes/content";
const app = express();


app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/content", contentRouter)

app.listen(3000)
