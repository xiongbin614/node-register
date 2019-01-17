var fs = require("fs");

module.exports={
    /**
     * 
     * @param {string} filePath 文件路劲 
     */
    readfile:function(filePath){
        try {
         return   fs.readFileSync(filePath);
        } catch (error) {
            throw error;
        }
    },
    readImg:function(imgPath){
        try {
            return fs.readFileSync(imgPath,'binary');            
        } catch (error) {
            throw error;            
        }
    },
    writeInfo:function(name,pwd){
           var infoObj = {};
           var infoArr = [];
           infoObj.name = name;
           infoObj.pwd = pwd;
           infoArr.push(infoObj);

        console.log(infoArr)
        fs.appendFile("./info.json", JSON.stringify(infoArr), function (err) {
                if(err){
                    console.log("读取出错")
                }else{
                    console.log("储存成功")
                }
           })
       
    }
}