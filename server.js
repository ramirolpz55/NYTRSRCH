//Depenndencies 
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');

//PORT ENVIORNMENTS 
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//Set the Public folder ass static
app.use(express.static('./public'));

//MONGODB_URI connects to the Heroku mLab databse using mongoose. 
var link = 'mongodb://heroku_k0mhwvvc:3obd8q5pe21e8qsg4c383hvqe0@ds151127.mlab.com:51127/heroku_k0mhwvvc';

mongoose.connect(link);
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

//Home Route
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

//Get function
app.get('/api/saved', function(req, res) {

  Article.find({})
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

//Post function
app.post('/api/saved', function(req, res){
  var newArticle = new Article(req.body);

  var title = req.body.title;
  var date = req.body.date;
  var url = req.body.url;

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
    } else {
      res.send(doc._id);
    }
  });
});


//Delete function 
app.delete('/api/saved/', function(req, res){

  var url = req.param('url');

  Article.find({"url": url}).remove().exec(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});

//APP LISTEN PORT
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
