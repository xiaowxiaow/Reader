var User = require('../models/user');

// Display list of all Users.
exports.user_list = function (req, res) {
    User.find({})
        .then(values => {
            res.send(values);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display detail page for a specific User.
exports.user_detail = function (req, res) {
    User.findById(req.params.id)
       .then(value => {
            res.send(value);
        })
       .catch(err => {
            console.error(err);
        });
};

// Display User create form on GET.
exports.user_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle User create on POST.
exports.user_create_post = function (req, res) {
    User.create({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        email: req.body.email,
        password: req.body.password,
        identity: req.body.identity
    }).then(() => {
        res.send(true);
    }).catch(err => {
        console.error(err);
    });
};

// Display User delete form on GET.
exports.user_delete_get = function (req, res) {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Handle User delete on POST.
exports.user_delete_post = function (req, res) {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            console.error(err);
        });
};

// Display User update form on GET.
exports.user_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: User update GET');
};

// Handle User update on POST.
exports.user_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};

exports.user_login = function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password,
    }).then(value => {
        value.password = ''
        res.send(value);
    }).catch(err => {
        console.error(err);
    });
};
