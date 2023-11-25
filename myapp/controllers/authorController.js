var Author = require('../models/author');

// Display list of all Authors.
exports.author_list = function (req, res) {
    Author.find({})
        .then(values => {
            res.send(values);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display detail page for a specific Author.
exports.author_detail = function (req, res) {
    Author.findById(req.params.id)
       .then(value => {
            res.send(value);
        })
       .catch(err => {
            console.error(err);
        });
};

// Display Author create form on GET.
exports.author_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.author_create_post = function (req, res) {
    Author.create({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death
    }).then(() => {
        res.send(true);
    }).catch(err => {
        console.error(err);
    });
};

// Display Author delete form on GET.
exports.author_delete_get = function (req, res) {
    Author.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Handle Author delete on POST.
exports.author_delete_post = function (req, res) {
    Author.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display Author update form on GET.
exports.author_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};