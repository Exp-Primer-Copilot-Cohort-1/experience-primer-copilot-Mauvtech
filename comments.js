//create web server
const express = require('express');
const router = express.Router();
const db = require('../models');
const bodyParser = require('body-parser');
const Comment = db.Comment;
const User = db.User;
const Post = db.Post;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/comments', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    Comment.create({
      text: req.body.comment,
      UserId: req.user.id,
      PostId: req.body.postId
    })
    .then((comment) => {
      res.redirect(`/posts/${req.body.postId}`);
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

router.get('/comments/:id/edit', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [User, Post]
    })
    .then((comment) => {
      if (comment.UserId === req.user.id) {
        res.render('comments-edit', {comment: comment});
      } else {
        res.redirect(`/posts/${comment.Post.id}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

router.put('/comments/:id', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [User, Post]
    })
    .then((comment) => {
      if (comment.UserId === req.user.id) {
        Comment.update({
          text: req.body.comment
        }, {
          where: {
            id: req.params.id
          }
        })
        .then((comment) => {
          res.redirect(`/posts/${comment[0].PostId}`);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        res.redirect(`/posts/${comment.Post.id}`);
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
});

router.delete('/comments/:id', (req, res) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    Comment.findOne({
      where: {
        id: req.params.id
      },
      include: [User, Post]
    })  }
});

