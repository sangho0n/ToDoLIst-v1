// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

const newItems = []; // in js, pushing on a const arr is possible
const workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render('list', { listTitle: day, newListItems: newItems});
});


app.post("/", function(req, res){

  if(req.body.list === "Work"){
    workItems.push(req.body.newItem);
    res.redirect("/work");
  }
  else{
    newItems.push(req.body.newItem);
    res.redirect("/");
  }
});


app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});



app.listen(3000, function() {
  console.log("server started on 3000");
});
