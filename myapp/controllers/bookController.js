var Book = require('../models/book');

exports.index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all books.
exports.book_list = function (req, res) {
    Book.find({})
        .then(books => {
            res.send(books);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display detail page for a specific book.
exports.book_detail = function (req, res) {
    Book.findById(req.params.id)
        .then(book => {
            res.send(book);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display book create form on GET.
exports.book_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');

};

// Handle book create on POST.
exports.book_create_post = function (req, res) {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        isbn: req.body.isbn,
        genre: req.body.genre
    }).then(() => {
        res.send(true);
    }).catch(err => {
        console.error(err);
    });
};

// Display book delete form on GET.
exports.book_delete_get = function (req, res) {
    Book.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Handle book delete on POST.
exports.book_delete_post = function (req, res) {
    Book.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display book update form on GET.
exports.book_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};