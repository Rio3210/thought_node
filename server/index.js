const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thought',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.execute('SELECT name, thought FROM thoughts');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

function isValid(tot) {
  return tot.name && tot.name.toString().trim() !== '' &&
    tot.thought && tot.thought.toString().trim() !== '';
}

app.post('/tot', async (req, res) => {
  console.log(req.body);
  if (isValid(req.body)) {
    const tot = {
      name: req.body.name.toString(),
      thought: req.body.thought.toString()
    };
    try {
      const connection = await pool.getConnection();
      const [result, fields] = await connection.execute('INSERT INTO thoughts (name, thought) VALUES (?, ?)', [tot.name, tot.thought]);
      connection.release();
      console.log('Number of records inserted:', result.affectedRows);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    res.status(422);
    return res.json({
      message: 'Both name and thought are required!!'
    });
  }
});

app.listen(5000, () => {
  console.log('listening on http://localhost:5000');
});
