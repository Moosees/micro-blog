const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const port = 4000
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
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(port, () => {
  console.log(`Running POSTS service on port ${port}`);
});
