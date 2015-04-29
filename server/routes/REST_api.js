var express = require('express');
var router = express.Router();
var dbFacade = require('../model/dbfacade');

var mongoose = require('mongoose');
var wiki = mongoose.model('Wiki');


router.get('/wiki/:title', function(req,res ){
    dbFacade.getWiki(req.params.title,function(err,data){
        console.log(data);
        res.send(data);
    })
});

router.get('/findWiki/:searchString', function(req,res){
    dbFacade.findWiki(req.params.searchString, function(err,data){
        console.log(data);
        res.send(data);
    })
});

router.get('/categories', function(req, res){
    dbFacade.getCategories(function(err,data){
        res.send(data);
    })
});

router.get('/getWikisWithCategory/:cat', function(req,res){
    dbFacade.getWikiWithCategory(req.params.cat, function(err,data){
        console.log(data);
        res.send(data);

    })
})

module.exports = router;
