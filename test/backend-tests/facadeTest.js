/**
 * Created by Uffe on 29-04-2015.
 */
global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";

var should = require("should");
var dbFacade = require('../../server/model/dbfacade');
var testPort = 3333;
var app = require("../../server/app");
var mongoose = require('mongoose');
var wiki = mongoose.model('Wiki');

describe("Testing DataBase Facade", function () {

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
    })
    after(function(){
        mongoose.connection.db.dropDatabase();
    })



    describe("Testing getWiki method", function(){
        it("should return a wiki object on a given title", function(done){
            dbFacade.getWiki("TestTitle", function(err, data){
                (JSON.parse(data)[0].title).should.equal("TestTitle");
                done();
            })})})

    describe("Testing findWiki method", function(){
        it("Should return a list of titles and abstracts of wiki objects that equals given String", function(done){
            dbFacade.findWiki("Test", function(err, data){
                var array = (JSON.parse(data));
                console.log(array.length);
                array.length.should.equal(3);
                done();
            })})})

    describe("Testing getCategories method", function(){
        it("Should return a list of categories", function(done){
            dbFacade.getCategories(function(err, data){
                var array = (JSON.parse(data));
                array.length.should.equal(3);
                done();
            })})})

    describe("Testing getWikiWithCategory method", function(){
        it("Should return a list of wikis with given category", function(done){
            dbFacade.getWikiWithCategory("test1",function(err, data){
                var array = (JSON.parse(data));
                array.length.should.equal(1);
                done();
            })})})



});