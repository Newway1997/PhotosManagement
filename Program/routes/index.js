var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs=require("fs");

var upload = multer({ dest: __dirname + '/temp/' });
router.get('/',function (req,res) {

    res.redirect('/photos');
});
router.get('/add',function (req,res) {
    try{
    fs.mkdirSync("public"+req.query["thisDir"]+req.query["newDir"]);
    }catch (e){
        // res.end("file already exists");
        res.render("showErrors",{message:"file already exists"});
        return;
    }
    res.redirect(req.query["thisDir"]);
});
router.post('/upload',upload.single("file"),function (req,res) {
    var type=req.file.originalname.split(".").pop();
    if(type==="png"||type==="jpg"||type==="jpeg"||type==="bmp"){
fs.renameSync(req.file.path,"./public"+req.body["thisDir"]+req.file.originalname);}
else{
        fs.unlink(req.file.path);
        res.render("showErrors",{message:"不支持该格式"});
        return;
    }
    res.redirect(req.body["thisDir"]);
});
module.exports = router;
