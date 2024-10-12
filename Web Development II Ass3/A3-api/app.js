const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Path Module
const path = require('path')

const app = express();
//Configure body—parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json());
//Configuration page
app.use(express.static(path.join(__dirname, 'public')))
//Cross domain module
app.use(cors())

var { query } = require('./db/crowdfunding_db'); //Import the query method defined in db.js

const {
  fundraiserSheet, categorySheet
} = require('./db/actions');

//Route for handling GET requests, path '/home'
app.get('/home', function (req, res, next) {
  //Querying records in the database with an active field of 1 usually indicates active records
  fundraiserSheet.select(" active=1 ", (err, resdata) => {
    //Send a response with status code 200, prompt message 'request successful', and retrieved data
    res.send({ status: 200, code: 'request success!', data: resdata });
  });
});

//List data
app.get('/search', function (req, res, next) {
  const query = req.query;
  var str=' 1=1 '
  if(query.city){
    str+=" and city='"+query.city+"' "
  }
  if(query.category_id){
    str+=" and category_id="+query.category_id
  }
  if(query.caption){
    str+=" and caption like '%"+query.caption+"%' "
  }
  fundraiserSheet.select(str, (err, resdata) => {
    res.send({ status: 200, code: 'request success!', data: resdata });
  });
});


//Detail
app.get('/detail/:id', function (req, res, next) {
  if(req.params.id && parseInt(req.params.id)>0){
    const upid = parseInt(req.params.id)
    query("SELECT * from fundraiser fr,category ca where fr.category_id = ca.category_id and fundraiser_id="+upid, (err, data) => {
      if (data.length > 0) {
        res.send({ status: 200, code: 'request success!', data: data[0] });
      } else {
        res.send({ status: 504, code: 'request error!' });
      }
    });
  }else{
    res.send({ status: 504, code: 'id is null!' });
  }
});




//Access address (port number 8111)
const server = app.listen(8111, function () {
  console.log("Access address:");
  console.log("http://localhost:" + server.address().port + "/index.html");
});