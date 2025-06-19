import Post from "../models/post.model.js"
import { sendRequestToKafka } from "../kafka/producer/kafka.producer.js"

export const postCount = async (_, res) => {
  try {
    const postCount = await Post.countDocuments()
    return res.status(200).json({postCount})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getAllPost = async (_, res) => {
  try {
    const posts = await Post.find()
    return res.status(200).json({posts})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const createPost = async (req, res) => {
  try {
    const {title, content, author} = req.body
    if (!title || !content || !author) return res.status(400).json({message: "All fields are required"})
    await sendRequestToKafka({
      title,
      content,
      author
    })
    return res.status(202).json({message: "Post creation queued in kafka"})
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

