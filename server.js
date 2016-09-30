var express = require("express");
var compression = require("compression");
var path = require("path");
var app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "src")));
app.set("PORT", process.env.PORT || 8899);

var router = express.Router();

router.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(app.get("PORT"), function(){
  console.log("[%s]: 10K APART APP is on PORT: %s", new Date().toLocaleTimeString(), app.get("PORT"));
});
