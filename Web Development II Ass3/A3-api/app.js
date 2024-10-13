const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Path Module
const path = require('path')
const multer = require('multer')
const app = express();
//Configure body—parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//Configuration page
app.use(express.static(path.join(__dirname, '..', 'A3-clientside')));
app.use(express.static(path.join(__dirname, '..', 'A3-serverside')));
//parse application/json
app.use(bodyParser.json());

//Cross domain module
app.use(cors())

var { query } = require('./db/crowdfunding_db'); //Import the query method defined in db.js

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './A3-clientside/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const {
  fundraiserSheet, donationSheet
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
        let detail = data[0];
        donationSheet.select(" fundraiser_id="+upid+" order by date desc", (err, donationData) => {
          detail['donations'] = donationData
          res.send({ status: 200, code: 'request success!', data: detail});
        });
      } else {
        res.send({ status: 504, code: 'request error!' });
      }
    });
  }else{
    res.send({ status: 504, code: 'id is null!' });
  }
});

//detailSimple
app.get('/detailSimple/:id', function (req, res, next) {
  if(req.params.id && parseInt(req.params.id)>0){
    const upid = parseInt(req.params.id)
    fundraiserSheet.select(" fundraiser_id="+upid, (err, data) => {
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

//删除募捐列表
app.delete('/fundraiser/:id', function (req, res, next) {
  if(req.params.id && parseInt(req.params.id)>0){
    const upid = parseInt(req.params.id)
    fundraiserSheet.delete({index:"fundraiser_id",value:upid}, (err, data) => {
      if(data.affectedRows > 0){
        res.send({ status: 200, code: 'request success!'});
      } else {
        res.send({ status: 504, code: 'request error!' });
      }
    });
  }else{
    res.send({ status: 504, code: 'id is null!' });
  }
});


//新增募捐
app.post('/fundraiserAdd', function (req, res, next) {
  let body = req.body;
  fundraiserSheet.insert(body,(err, data) => {
    if (err) {
      res.send({ status: 504, code: 'request error!' });
      return;
    }
    if(data.affectedRows > 0){
      res.send({ status: 200, code: 'request success!' });
    }else{
      res.send({ status: 504, code: 'request error!' });
    }
  });
});

//修改募捐
app.put('/fundraiserEdit', function (req, res, next) {
  let body = req.body;
  fundraiserSheet.update("fundraiser_id",body,(err, data) => {
    if (err) {
      res.send({ status: 504, code: 'request error!' });
      return;
    }
    if(data.affectedRows > 0){
      res.send({ status: 200, code: 'request success!' });
    }else{
      res.send({ status: 504, code: 'request error!' });
    }
  });
});

//捐赠
app.post('/donation', function (req, res, next) {
  let body = req.body;
  //新增捐款
  donationSheet.insert(body,(err, data) => {
    if (err) {
      res.send({ status: 504, code: 'request error!' });
      return;
    }
    if(data.affectedRows > 0){
      //更新捐款进度费用总数
      query("update fundraiser set current_funding = cast(current_funding as DECIMAL)+"+body.amount+" where fundraiser_id="+body.fundraiser_id, (fundraisererr, fundraiserdata) => {
        if (fundraisererr) {
          res.send({ status: 504, code: 'request error!' });
          return;
        }
        if(fundraiserdata.affectedRows > 0){
          res.send({ status: 200, code: 'request success!' });
        }else{
          res.send({ status: 504, code: 'request error!' });
        }
      })
    }else{
      res.send({ status: 504, code: 'request error!' });
    }
  });
});

//上传
app.post('/upload',upload.single("image"), function (req, res, next) {
  if(req.file){
    res.send({ status: 200, code: 'request success!', data: req.file.filename });
  }else{
    res.send({ status: 504, code: 'request error!' });
  }
})


//Access address (port number 8111)
const server = app.listen(8111, function () {
  console.log("Access address:");
  console.log("http://localhost:" + server.address().port + "/index.html");
});