var Comment = require('../models/comment');

exports.index = function (req, res) {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all comments.
exports.comment_list = function (req, res) {
  Comment.find({})
    .then(comments => {
      res.send(comments);
    })
    .catch(err => {
      console.error(err);
    });
};

// Display detail page for a specific comment.
exports.comment_detail = function (req, res) {
  Comment.findById(req.params.id)
    .then(comment => {
      res.send(comment);
    })
    .catch(err => {
      console.error(err);
    });
};

// Display comment create form on GET.
exports.comment_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Comment create GET');
};

// Handle comment create on POST.
exports.comment_create_post = function (req, res) {
  Comment.create({
    book: req.body.book,
    content: req.body.content,
    score: req.body.score,
    user: req.body.user
  }).then(() => {
    res.send(true);
  }).catch(err => {
    console.error(err);
  });
};

// Display comment delete form on GET.
exports.comment_delete_get = function (req, res) {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send(true);
    })
    .catch(err => {
      console.error(err);
    });
};

// Handle comment delete on POST.
exports.comment_delete_post = function (req, res) {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send(true);
    })
    .catch(err => {
      console.error(err);
    });
};

// Display comment update form on GET.
exports.comment_update_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Comment update GET');
};

// Handle comment update on POST.
exports.comment_update_post = function (req, res) {
  res.send('NOT IMPLEMENTED: Comment update POST');
};