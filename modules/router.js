var file=require("./file.js");
var url = require("url");
var qs=require("querystring");
const MongoClient=require("mongodb").MongoClient;
const url1 = 'mongodb://127.0.0.1:27017';
module.exports={
    login:function(req,res){
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        var data=file.readfile("./views/login.html");
        res.write(data);
        res.end();
    },
    register: function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        var data = file.readfile("./views/register.html");
        res.write(data);
        res.end();
    },
    home: function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        var data = file.readfile("./views/home.html");
        res.write(data);
        res.end();
    },
    img: function (req, res) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        var data = file.readImg("./imgs/1.jpg");
        res.write(data, 'binary'); 
        res.end();
    },
    // 注册
    reginfo:function(req,res){
        res.writeHead(200,{"Content-type": "text/html;charset=utf-8"})
        // 1.get获取将会在url显示，一旦显示就会执行回到首页的代码，则不行
        // var params = url.parse(req.url, true).query;
        // console.log(params.username);
        // console.log(params.pwd);
        // if (params.username && params.pwd) {//证明输入密码和用户
        //     writeInfo(params.username, params.pwd);
        // }
        // 2.post方法获取
        var rawData = '';
        req.on('data', function (chunk) {
            rawData += chunk;
        });
        req.on('end', function () {
            // console.log(rawData);
            var params = qs.parse(rawData);
            // file.writeInfo(params.username, params.pwd);
            MongoClient.connect(url1, function (err, client){
                if(err){
                    console.log("连接数据库失败");
                }else{//连接数据库成功
                    const db = client.db('xb');
                   db.collection('ures').find({name: params.username}).toArray(function(err,result){
                       if (result.length==0){
                           db.collection('ures').insertOne({
                            name: params.username,
                            pwd: params.pwd,
                            email: params.email,
                            dress: params.dress,
                            like: params.like
                    });
                       }else{
                          console.log("已经注册");
                           res.write("<h1>已经注册</h1>");
                       }
                       client.close();
                       res.end();
                    });
                    
                    // client.close();
                    // res.end();
                }            
            });

        });
    },
    // 登录
    loginInfo:function(req,res){
        res.writeHead(200,{
            'Content-Type': 'text/html; charset=utf-8'
        })
        var rawData = '';
        req.on("data",function(chunk){
            rawData+=chunk; 
        })
        req.on("end",function(){
            let params=qs.parse(rawData);
            MongoClient.connect(url1,function(err,client){
                if(err){
                    res.write("<h1>连接数据库失败</h1>");
                }else{
                    const db = client.db('xb');
                    db.collection('ures').find({
                        name:params.username,
                        pwd:params.pwd
                    }).toArray(function(err,result){
                        if(err){
                            console.log("查询出错");
                        }else{
                            if(result.length==0){//没有用户
                                console.log("用户名或者密码错误");
                                res.write("用户名或者密码错误");
                            }else{
                                console.log("登录成功");
                                console.log(result[0].name);
                               let data=file.readfile("./views/show.html");
                                res.write(data);
                            }
                            
                        }
                        client.close();
                        res.end();
                    });
                }
            })
        })
    }
}


// 登录
// loginInfo: function(req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/html; charset=utf-8'
//     })
//     var rawData = '';
//     req.on("data", function (chunk) {
//         rawData += chunk;
//     })
//     req.on("end", function () {
//         let params = qs.parse(rawData);
//         MongoClient.connect(url1, function (err, client) {
//             if (err) {
//                 res.write("<h1>连接数据库失败</h1>");
//             } else {
//                 const db = client.db('xb');
//                 db.collection('ures').find({
//                     name: params.username,
//                     pwd: params.pwd
//                 }).count(function (err, num) {
//                     if (err) {
//                         console.log("查询失败");
//                     } else {
//                         console.log("查询成功");
//                         if (num >= 1) {
//                             console.log("登录成功");
//                             //在在数据库里拿到当前用户的信息渲染在页面上
//                             var data = file.readfile("./views/show.html");
//                             res.write(data);

//                         } else {
//                             console.log("登录失败")
//                         }
//                     }
//                     client.close();
//                     res.end();
//                 });
//             }
//         })
//     })
// }