const express = require('express');
const router = express.Router();

// import the controller
const controller = require('./controller.js');

// define the routes
router.get('/', controller.hello);

router.get('/verifyToken', controller.verifyToken);
router.post('/login', controller.login);
router.post('/fetchBalance', controller.isLoggedIn, controller.fetchBalance);
router.post('/fetchHistory', controller.isLoggedIn, controller.fetchHistory);
// export the routes
module.exports = router;
