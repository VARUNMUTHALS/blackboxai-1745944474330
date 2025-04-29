const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const audioRoutes = require('./routes/audio')
const animationRoutes = require('./routes/animations')

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/process-audio', audioRoutes)
app.use('/animation', animationRoutes)

app.listen(port, () => {
  console.log("Server running on port " + port)
})
