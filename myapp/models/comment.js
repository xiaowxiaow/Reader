var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    content: { type: String, required: true },
    score: { type: String, required: true },
    user: { type: String, required: true },
  }
);

// Virtual for book's URL
CommentSchema
  .virtual('url')
  .get(function () {
    return '/catalog/book/' + this._id;
  });

//Export model
module.exports = mongoose.model('Comment', CommentSchema);