import express from "express"
import { postCount, getAllPost, createPost } from "./controllers/post.controller.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, res) => {
  res.send("Backend is running...!")
})
app.get("/api/post", getAllPost)
app.get("/api/count", postCount)
app.post("/api/post", createPost)

export default app