// 创建服务器
var http=require("http");
var fs=require("fs");
var sever= http.createServer(function(req,res){
    if (req.url ==='/favicon.ico'){
        res.end();
        return;
    }else if(req.url==='/'){
        fs.readFile('./index.html',function(err,data){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(data);
            res.end();
            return;
        })
    } else if (req.url === '/goods') {
        fs.readFile('./goods.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write(data);
            res.end();
            return;
        })
    }
});
sever.listen(3001);
