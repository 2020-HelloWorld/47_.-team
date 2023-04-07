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
router.post('/create/user', controller.isLoggedIn, controller.createUser);
router.post('/claim/credits', controller.isLoggedIn, controller.claimCredits);
router.post('/convert/credits', controller.isLoggedIn, controller.convertCredits);
router.post('/initiate/transaction', controller.isLoggedIn, controller.intiateTransaction);

router.post('/upload/doc', controller.isLoggedIn, controller.uploadDetails);
router.post('/fetch/approvaldata', controller.isLoggedIn, controller.fetchApprovalData);
router.post('/approve/application', controller.isLoggedIn, controller.appApproval);
// export the routes
module.exports = router;
