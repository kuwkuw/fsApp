var assert = require('assert');
var fsS = require('../server/fsService');

describe("sfService testing", function(){
    var fss = new fsS();
    describe("Tests for getDirStructure()", function(){
        var result = fss.getDirStructure('./')
        var resultNotValidPath = fss.getDirStructure('node_modules/jade');
        var resultValidPath = fss.getDirStructure('.\\node_modules\\jade\\');
        it("Return array", function(){
            assert.equal(Array.isArray(result),true);
        });

        it("item is json", function(){
            assert.equal(typeof result[0],'object');
        });

        it("not valid path", function(){
            assert.equal(resultNotValidPath.length, 0);
        });

        // it("valid path", function(){
        //     assert.equal(resultValidPath.length, 15);
        // });
    });
});