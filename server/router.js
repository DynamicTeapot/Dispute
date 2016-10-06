var router = require('express').Router();
var disputeController = require('./disputeCtrl.js');
disputeController.init();

router
  .get('/dispute', disputeController.getDispute)
  .post('/dispute/:id/:polarity', disputeController.updateDispute);

module.exports = router;