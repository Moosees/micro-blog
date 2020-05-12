const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const port = 4001;
const app = express();
app.use(bodyParser.json());
app.use(cors());

// hold our comment data for now
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  const newId = randomBytes(4).toString('hex');

  const comments = commentsByPostId[id] || [];

  comments.push({ id: newId, content });

  commentsByPostId[id] = comments;

  res.status(201).send(commentsByPostId[id]);
});

app.listen(port, () => {
  console.log(`Running COMMENTS service on port ${port}`);
});
