import { Kafka } from "kafkajs";
import Post from "../../models/post.model.js";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: process.env.KAFKA_MECHANISM,
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  }
});

const consumer = kafka.consumer({
  groupId: "test-group",
})

const message_buffer = []
const batch_size = 100
const flush_interval = 5000

const flushMessages = async () => {
  if (message_buffer.length == 0) return

  const batch = [...message_buffer]
  message_buffer.length = 0

  try {
    await Post.insertMany(batch)
  } catch (error) {
    console.log(`Error inserting message: ${error.message}`)
  } 
}

setInterval(flushMessages, flush_interval)

export const startConsumer = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: "Test-Topic", fromBeginning: false })

  await consumer.run({
    eachMessage: async ({message}) => {
      const data = JSON.parse(message.value.toString())
      try {
        message_buffer.push({
          title: data.title,
          content: data.content,
          author: data.author,
          date: data.date
        })
        if (message_buffer.length >= batch_size) {
          await flushMessages()
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  })
  
}
