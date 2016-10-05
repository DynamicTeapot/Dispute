var router = require('express').Router();
var disputeController = require('./disputeCtrl.js');
disputeController.init();

router
  .get('/dispute', disputeController.getDispute)
//   .post('/createDispute')
//   .post('/dispute/:id/:polarity')

module.exports = router;