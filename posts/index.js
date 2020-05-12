const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const port = 4000;
const app = express();
app.use(bodyParser.json());

// hold our post data for now
const posts = {
  gsgsgd: {
    id: 'gsgsgd',
    title: 'test',
  },
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { title } = req.body;
  const newId = randomBytes(4).toString('hex');

  posts[newId] = { newId, title };

  res.status(201).send(posts[newId]);
});

app.listen(port, () => {
  console.log(`Running POSTS service on port ${port}`);
});
