const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({ message: "HelloWorld!", secret: process.env.TESTING })
})

app.listen(port, () => {
  // const { Pool } = require("pg")

  // const db = new Pool()

  // db.query(`CREATE TABLE IF NOT EXISTS testing(id SERIAL PRIMARY KEY);`)
  console.log(`Example app listening on port ${port}`)
})