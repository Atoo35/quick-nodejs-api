const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Topic = require('./TopicName')
const port = 3000
const CATEGORIES = ["UNDERSTOOD", "SOMEWHAT UNDERSTOOD", "NOT CLEAR", "WHAT RUBBISH"]
app.use(bodyParser.json())
app.use(cors())


app.post('/add', async (req, res) => {
  try {
    const { topicName, topicBody } = req.body;
    const split1 = topicBody.split(/(?=[-_\n.,?{}()\[\]""'|:/\\])|(?<=[-_\n.,?{}()\[\]""'|:/\\])/);
    let text = ''
    const newObj = []
    for (let ele = 0; ele < split1.length; ele++) {
      text += split1[ele];
      if (ele % 2 == 0) {
        const tt = { text: split1[ele], delimiter: split1[ele + 1], cat: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] }
        newObj.push(tt)
      }
    }
    const topicNameObject = await Topic.create({ topicName, topicBody: newObj });
    const { topicBody: responseObject } = topicNameObject;
    console.log(topicNameObject)
    res.json({ text, categorized: responseObject })
  } catch (error) {
    res.json(error)
  }
})

app.get('/topics', async (req, res) => {
  try {
    const topics = await Topic.find({}, { _id: 0 }).lean()
    res.json({ topics })
  } catch (error) {
    res.json(error)
  }
})

app.get('/topic/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params;
    const topicData = await Topic.findById(mongoose.Types.ObjectId(topicId), { __v: 0 })
    res.json({ topic: topicData })
  } catch (error) {
    res.json(error)
  }
})

app.put('/block/:blockId', async (req, res) => {
  try {
    const { blockId } = req.params;
    const { category } = req.body;
    const update = await Topic.updateOne(
      {
        "topicBody": { "$elemMatch": { _id: mongoose.Types.ObjectId(blockId) } }
      },
      {
        "$set": { "topicBody.$.cat": category }
      })
    update.modifiedCount == 1 ?
      res.json({ message: 'Successfully updated!' }) :
      res.json({ message: 'Something went wrong!' })

  } catch (error) {
    res.json(error)
  }
})

mongoose.connect(process.env.MONGO_URI, {
  useNewURLParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
  app.listen(port, () => {
    // const { Pool } = require("pg")

    // const db = new Pool()

    // db.query(`CREATE TABLE IF NOT EXISTS testing(id SERIAL PRIMARY KEY);`)
    console.log(`Example app listening on port ${port}`)

  })

});

// const express = require('express');
// const promise = require('bluebird');

// // Constants 
// const PORT = 3000;
// const HOST = '0.0.0.0';
// const cn = {
//   host: 'localhost', // host of db container 
//   port: 5432, // 5432 is the default; 
//   database: 'postgres', // database name 
//   user: 'postgres', // database user name 
//   password: 'postgres' // database password 
// };
// const initOptions = {
//   promiseLib: promise
// };

// (async function () {
//   const pgp = require('pg-promise')(initOptions);
//   const db = pgp(cn); // database instance; 
//   const result = await db.one('SELECT current_database();');

//   // Create express app 
//   const app = express();
//   app.get('/', async (req, res) => {
//     res.send('Hello, remote world! Current database: ' + result.current_database);
//   });

//   app.listen(PORT, HOST);
//   console.log(`Running on http://${HOST}:${PORT}`);

//   // Used for automated testing 
//   if (process.env.REGRESSION_TESTING === 'true') { process.exit(0); }
// })();