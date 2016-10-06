const db = require('./postgres');


//Condensed version of methods on the db since all we really need to access is the transactions
module.exports = {
    // all methods return a promise
    // getters resolve with -> [{...}, {...}, ...]
    // create methods can take an array of objects -> [{data}, {...}, ...]
  transactions: {
    getAll() {
      return db.select().from('transactions')
      .catch(err => console.error(`Error getting all transactions ${err}`));
    },
    getByItemId(id) {
      return db('transactions').where('item_id', id);
    },
    getAllDisputes() {
      return db('transactions').where('order_status', 'disputed');
    },
    // data = {item_id: item id(num), buyer_id: user id(num), seller_id: user id(num)}
    // can take an array of data objects -> [{...}, {...}, ...]
    // resolves promise by returning the id of the first newly created record
    updateTransaction(id, props) {
      return db('transactions').where('id', id).update(props);
    },
    resolveDispute(id, polarity) {
      if(polarity > 0) {
        return db('transactions').where('id', id).update({'order_status', 'buyer won'});
      } else {
        return db('transactions').where('id', id).update({'order_status', 'seller won'});
      };
    }
  }
};
