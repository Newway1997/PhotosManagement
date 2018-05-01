var express = require('express');
var router = express.Router();
var fs=require("fs");
/* GET home page. */

router.get(/.*/, function(req, res) {
    if(req.url.split(".").length<2){
        var dir="/photos"+req.url;
    }
    var files=fs.readdirSync("./public/"+dir);
    res.render('photos', { files: files ,dir:dir});
});

module.exports = router;
