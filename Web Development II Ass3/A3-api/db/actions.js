var {
  fundraiser,category
} = require('./table'); //Importing table information defined in table.js
var { query } = require('./crowdfunding_db'); //Import the query method defined in db.js
class Surface { //Declared table operation class
  fieds = [];
  sheetName = '';
  index = '';
  value = '';
  selectAll = '';
  query = undefined;
  dateReg = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}\s*[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;
  numReg = /^[0-9]+.?[0-9]*/;
  constructor(sheetName, fiedList, query) {
    if (!sheetName || !fiedList || !query) {
      throw new Error('Failed to create data table class operation class, missing construction parameters....');
    }
    this.sheetName = sheetName;
    this.fieds = fiedList;
    this.query = query;
    this.selectAll = `SELECT * from ${sheetName};`;
  }

  //Table query specified field method
  selectColum(colum, call) {
    //On demand inquiry
    const sql = `SELECT ${colum} from ${this.sheetName};`;
    //Call the query method to query
    this.query(sql, call);
  }

  //Table query method
  select(data, call) {
    if (data && call && typeof data !== 'function' && typeof call === 'function') {
      let order = ""
      if (data['order']) {
        //data sorting
        order = ` order by ${data['order']} `;
        delete data.order;
      }
      //On demand inquiry
      const sql = `SELECT * from ${this.sheetName} where ${data} ${order};`;
      //Call the query method to query
      this.query(sql, call);
      return;
    }
    if (!call) {
      this.query(this.selectAll, call);
    }
  }

}

//Create table operation class instance
const fundraiserSheet = new Surface(fundraiser.name, fundraiser.fieds, query);
const categorySheet = new Surface(category.name, category.fieds, query);

//Export instance
module.exports = {
  fundraiserSheet,
  categorySheet
};
