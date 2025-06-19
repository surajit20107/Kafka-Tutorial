import mongoose from "mongoose"
import { startConsumer } from "../kafka/consumer/kafka.consumer.js"

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB")
      startConsumer().then(() => {
        console.log("kafka consumer started")
      }).catch((err) => {
        console.log("kafka connection error: "+err.message)
      })
  })
    .catch((err) => {
      console.log(err.message)
  })
}

export default connectDB;