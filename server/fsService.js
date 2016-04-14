var fs = require("fs");

function FsService(){

}

FsService.prototype.getDirStructure = function(path){
    var normPath = this.normilaizPath(path);
    
    console.log('Path:', normPath);
    var directoryContent = [];
    try{
        directoryContent = fs.readdirSync(normPath)
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
       return null;
    }
    return {
        path: path,
        directoryContent: directoryContent
        
    }
};


FsService.prototype.normilaizPath = function(path){
    var normPath = path.replace(/\\/g, "/");
    if(path[path.length-1] !== '/'){
        normPath = normPath + '/';
    }
    return normPath;
};

module.exports = FsService;