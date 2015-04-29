var express = require('express');
var router = express.Router();
var dbFacade = require('../model/dbfacade');

var mongoose = require('mongoose');
var wiki = mongoose.model('Wiki');


router.get('/wiki/:title', function(req,res ){
    dbFacade.findWiki(req.params.title,function(data){
        res.send(data);
    })
})


module.exports = router;
