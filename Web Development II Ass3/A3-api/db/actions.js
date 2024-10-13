var {
  fundraiser,category,donation
} = require('./table'); //Importing table information defined in table.js
var { query } = require('./crowdfunding_db'); //Import the query method defined in crowdfunding_db.js
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

  
  //Field detection to determine if the fields passed in by the front-end are correct
  checkFieds(obj) {
    for (const k in obj) {
      //If the input data field is incorrect, the field information can be deleted or changed to other operations
      if (k in this.fieds) {
        delete obj[k];
      }
    }
    return obj;
  }

  //Table data insertion method
  insert(args, call) {
    this.index = '';
    this.value = '';
    args = this.checkFieds(args);
    for (let key in args) {
      this.index = `${this.index}${key},`;
      if (this.numReg.test(args[key])) {
        if (this.dateReg.test(args[key])) {
          this.value = `${this.value}"${args[key]}",`;
        } else {
          this.value = `${this.value}${args[key]},`;
        }
      } else {
        this.value = `${this.value}'${args[key]}',`;
      }
    }
    this.index = this.index.substr(0, this.index.length - 1);
    this.value = this.value.substr(0, this.value.length - 1);
 
    const sql = `INSERT INTO ${this.sheetName} (${this.index}) VALUES(${this.value})`;
    //Call the query method to query
    this.query(sql, call);
  }

  
  //Table deletion method
  delete(data, call) {
    const { index, value } = data;
    const sql = `DELETE from ${this.sheetName} where ${index}=${value};`; //Delete on demand
    this.query(sql, call);
  }

  //Table data update method
  update(index, args, call) {
    this.value = '';
    args = this.checkFieds(args);
    for (let key in args) {
      if (key !== index) {
        if (this.numReg.test(args[key])) {
          if (this.dateReg.test(args[key])) {
            this.value = `${this.value}${key}="${args[key]}",`;
          } else {
            this.value = `${this.value}${key}=${args[key]},`;
          }
        } else {
          this.value = `${this.value}${key}='${args[key]}',`;
        }
      }
    }
    this.value = this.value.substr(0, this.value.length - 1);
    const sql = `UPDATE ${this.sheetName} SET ${this.value} WHERE ${index}=${args[index]};`;
    this.query(sql, call);
  }
  

}

//Create table operation class instance
const fundraiserSheet = new Surface(fundraiser.name, fundraiser.fieds, query);
const categorySheet = new Surface(category.name, category.fieds, query);
const donationSheet = new Surface(donation.name, donation.fieds, query);

//Export instance
module.exports = {
  fundraiserSheet,
  categorySheet,
  donationSheet
};
