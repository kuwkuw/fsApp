var assert = require("assert");
var fsS = require("../server/fsService");
var dbService = require("../server/DbService");

describe("sfService testing", function(){
    var fss = new fsS();
    describe("Tests for getDirStructure()", function(){
        var result = fss.getDirStructure("./")
        var resultNotValidPath = fss.getDirStructure("node_modules/jade");
        var resultValidPath = fss.getDirStructure(".\\node_modules\\jade\\");
        it("Return array", function(){
            assert.equal(typeof result, "object");
        });

        // it("item is json", function(){
        //     assert.equal(,'object');
        // });

        it("not valid path", function(){
            assert.equal(resultNotValidPath, null);
        });

        it("valid path", function(){
            assert.equal(resultValidPath.path, ".\\node_modules\\jade\\");
        });
    });
});

// describe("dbService testing", function() {
//     var coment;
//     describe("addComments", function() {
//         it("");
//     });
//     describe("getComments", function() {
//         it("");
//     });
// });