import "dotenv/config"
import app from "./app.js"
import connectDB from "./configs/db.config.js"

const port = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}).catch((err) => {
  console.log(err.message)
})