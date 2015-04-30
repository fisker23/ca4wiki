global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var wiki = mongoose.model("Wiki");

describe('REST API TEST', function () {
  //Start the Server before the TESTS
  before(function (done) {
    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  })

    beforeEach(function(done){
        wiki.remove({}, function ()
        {
            var array = [{title : "TestTitle", url :"testurl.test.url",abstract: "this is a test object with a test abstract as a test", categories : ["test1", "test2", "test3"], headings: null, links: null},
                         {title : "AnotherTitle", url :"testurl.test.url",abstract: "this is a different test object with a different test abstract as a test", categories : ["test2", "test3"], headings: null, links: null},
                         {title : "LastT", url :"testurl.test.url",abstract: "this is the last test object with the last test abstract as a test", categories : ["test3"], headings: null, links: null}];
            wiki.create(array,function(err){

                done();
            });
        });
    });

  after(function(){
    mongoose.connection.db.dropDatabase();
    testServer.close();
  });

    it("Method: getWiki(LastT) should get 1 wiki with the title 'LastT'", function (done) {
        http.get("http://localhost:"+testPort+"/api/wiki/LastT",function(res){
            res.setEncoding("utf8");//response data is now a string
            res.on("data",function(chunk){
                var n = JSON.parse(chunk);
                n.length.should.equal(1);
                n[0].title.should.equal("LastT");
                done();
            });
        })
    });

    it("Method: findWiki(test) should get 3 wikis containing the word 'test' ", function (done) {
        http.get("http://localhost:"+testPort+"/api/findWiki/test",function(res){
            res.setEncoding("utf8");//response data is now a string
            res.on("data",function(chunk){
                var n = JSON.parse(chunk);
                n.length.should.equal(3);
                done();
            });
        })
    });

    it("Method: getCategories should get 3 categories", function (done) {
        http.get("http://localhost:"+testPort+"/api/categories",function(res){
            res.setEncoding("utf8");//response data is now a string
            res.on("data",function(chunk){
                var n = JSON.parse(chunk);
                n.length.should.equal(3);
                done();
            });
        })
    });

    it("Method: getWikisWithCategory(test2) should get 2 wikis with the category 'test2'", function (done) {
        http.get("http://localhost:"+testPort+"/api/getWikisWithCategory/test2",function(res){
            res.setEncoding("utf8");//response data is now a string
            res.on("data",function(chunk){
                var n = JSON.parse(chunk);
                n.length.should.equal(2);
                done();
            });
        })
    });
});
