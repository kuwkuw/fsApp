var fs = require("fs");

function FsService(){

}

FsService.prototype.getDirStructure = function(path){
    var normPath = path.replace(/\\/g, "/");
    console.log('Path:', normPath);
    var result = [];
    try{
        result = fs.readdirSync(normPath)
            .map(function(item){
                var stat = fs.statSync(normPath + item);

                return{
                    name: item,
                    type: stat.isFile()? 'file':stat.isDirectory()? 'directory': null
                }
            })
            .sort(function(prev, next){
                if(prev.type === 'directory' && next.type === 'file'){
                    return -1;
                }

                if(prev.type === 'file' && next.type === 'directory'){
                    return 1;
                }

                return 0;
            });
    }
    catch(eror){
       console.log(eror);
    }
    return result;
};

module.exports = FsService;