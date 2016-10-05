var r = require('./dbs/redis');
var pg = require('./dbs/pgmodel');

//https://www.sitepoint.com/using-redis-node-js/
const updateDisputes = () => {
  console.log('Updating Disputes');
  pg.transactions.getAllDisputes().then(disputes => {
    if (disputes.length) {
      disputes = disputes.map(dispute => {
        return dispute.id.toString();
      });
      disputes.forEach(disputeID => {
        r.exists(disputeID, (err, reply) => {
          if (reply === 0) {
            r.hmset(disputeID, 'total', 0, 'voteCount', 0);
            r.expire(disputeID, 60*60*24*31); //Will expire after a month
          }
        });
      });
    } else {
      console.log('No disputes found.');
    }
  });
}

module.exports = {
  updateDispute: (req, res) => {
    r.hincrby(req.params.id.toString(), 'voteCount', Number(req.params.polarity), (err, reply) => {
      if(err){
        res.send(err)
      } else {
        r.hincrby(req.params.id.toString(), 'total', 1, (error, response) => {
          if (reply === 5){
            res.json(response);
          } else {
            res.sendStatus(200);
            r.hdel(req.params.id.toString());
          }
        });
      };
    });
  },
  getDispute: (req, res) => {
    r.keys('*', (err, reply) => {
      if(err) {
        res.json(err);
      } else if (reply.length) {
        res.json(reply[Math.floor(Math.random()*reply.length)]);
      } else {
        res.sendStatus(204);
      }
    });
  },
  init: () => {
    updateDisputes();
    setInterval(updateDisputes, 1000*60*60);
  },
  flush: (callback) => {
    //@err & @success
    r.flushdb(callback);
  }
};

// r.flushdb();
// r.lrem removes a thing from a list;