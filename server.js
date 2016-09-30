var express = require("express");
var compression = require("compression");
var path = require("path");
var morgan = require("morgan");
var request = require("request");
var parseString = require("xml2js").parseString;
var app = express();

app.use(compression());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "dist")));
app.set("PORT", process.env.PORT || 8899);

var router = express.Router();

router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "dist/index.min.html"));
});

router.get("/guardian", function(req, res){
  request("https://www.theguardian.com/uk/technology/rss", function(err, status, content){
    if(err)
      console.log(err);
    console.log("GUARDIAN LOADED");
    parseString(content, function(err, result){
      if(err)
        console.log(err);
      res.send(JSON.stringify(result));
    });
  });
});

router.get("/economist", function(req, res){
  request("http://www.economist.com/sections/science-technology/rss.xml", function(err, status, content){
    if(err)
      console.log(err);
    console.log("ECONOMIST LOADED");
    parseString(content, function(err, result){
      if(err)
        console.log(err);
      res.send(JSON.stringify(result));
    });
  });
});

app.use(router);

app.listen(app.get("PORT"), function(){
  console.log("[%s]: 10K APART APP is on PORT: %s", new Date().toLocaleTimeString(), app.get("PORT"));
});
