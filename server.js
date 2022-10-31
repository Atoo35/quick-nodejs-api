const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const CATEGORIES = ["UNDERSTOOD", "SOMEWHAT UNDERSTOOD", "NOT CLEAR", "WHAT RUBBISH"]
app.use(bodyParser.json())
app.use(cors())
app.post('/text', (req, res) => {
  console.log(req.body)
  const { test } = req.body;
  const split1 = test.split(/(?=[-_\n.,?{}()\[\]""'|:/\\])|(?<=[-_\n.,?{}()\[\]""'|:/\\])/);
  console.log(split1); // 👉️ ['a', 'b' , 'c', 'd']
  let text = ''
  const newObj = []
  for (let ele = 0; ele < split1.length; ele++) {
    text += split1[ele];
    if (ele % 2 == 0) {
      console.log(split1[ele + 1])
      const tt = { text: split1[ele], deliminator: split1[ele + 1], cat: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)] }
      newObj.push(tt)
    }
  }
  res.json({ text, categorized: newObj })
})

app.get('/', (req, res) => {
  const test = `Hello, this is a test. How are \'you\'?
  hahahaha. [This works perfectly]. doesn\'t it | this
  is:amazing\\\or is it`
  // const str = 'a-b_c-d';
  res.json({ message: "HelloWorld!", secret: process.env.TESTING })
})

app.listen(port, () => {
  // const { Pool } = require("pg")

  // const db = new Pool()

  // db.query(`CREATE TABLE IF NOT EXISTS testing(id SERIAL PRIMARY KEY);`)
  console.log(`Example app listening on port ${port}`)

})

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