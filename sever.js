// 创建服务器
var http=require("http");
var fs=require("fs");
var url=require("url");
var router = require("./modules/router.js");
var sever= http.createServer(function(req,res){
    if (req.url ==='/favicon.ico'){
        res.end();
        return;
    }
    var pathName = url.parse(req.url).pathname.substr(1);
    try {
        router[pathName](req, res);   
    } catch (error) {
        router['home'](req, res);   
    }
});
sever.listen(3001); 
