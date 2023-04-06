const express = require('express');
const router = express.Router();

// import the controller
const controller = require('./controller.js');

// define the routes
router.get('/', controller.hello);

router.get('/verifyToken', controller.verifyToken);
router.post('/login', controller.login);

// export the routes
module.exports = router;
