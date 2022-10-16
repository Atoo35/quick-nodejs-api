const express = require('express')
const app = express()
const port = 3005

app.get('/', (req, res) => {
  res.json({ message: "HelloWorld!", secret: process.env.TESTING })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})