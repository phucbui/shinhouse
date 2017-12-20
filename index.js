var express = require("express");
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)// + '-' + Date.now()
  }
})
 
var upload = multer({ storage: storage }).single('uploadfile');

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var port = process.env.PORT || 3000;

app.listen(3000);

var config = require('./config/database.js');

var pool = mysql.createPool(config.db);

app.get("/", function(req, res){
    res.render("user/body");
});