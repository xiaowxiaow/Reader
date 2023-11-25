var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController')

/// USER ROUTES ///

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/create', user_controller.user_create_get);

// POST request for creating Book.
router.post('/create', user_controller.user_create_post);

// GET request to delete Book.
router.get('/:id/delete', user_controller.user_delete_get);

// POST request to delete Book.
router.post('/:id/delete', user_controller.user_delete_post);

// GET request to update Book.
router.get('/:id/update', user_controller.user_update_get);

// POST request to update Book.
router.post('/:id/update', user_controller.user_update_post);

// GET request for one Book.
router.get('/:id', user_controller.user_detail);

// GET request for list of all Book items.
router.get('/', user_controller.user_list);

router.post('/login', user_controller.user_login);

module.exports = router;
