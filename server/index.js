const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const questionsRouter = require('./routes/questions');

app.use('/api/questions', questionsRouter)

app.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});
