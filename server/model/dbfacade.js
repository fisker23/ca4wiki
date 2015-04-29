/**
 * Created by Fisker og Uffe on 29-04-2015.
 */


var db = require('./db');
var mongoose = require('mongoose');
var wiki = mongoose.model('Wiki');

function _getWiki(title, callback){

    wiki.find({title : title }, function (err, result) {
        if(err){
            callback(err);
        }
        else{
            callback(null, JSON.stringify(result));
        }
    })
}

function _findWiki(searchString, callback){

    wiki.find({$or:[{title : new RegExp(searchString, 'i')}, {abstract :  new RegExp(searchString, 'i')}]}, 'title abstract', function (err, result) {
        if(err){
            callback(err);
        }
        else{
            callback(null, JSON.stringify(result));
        }
    })
}

function _getCategories(callback){

    wiki.find().distinct('categories', function (err, result) {
        if(err){
            callback(err);
        }
        else{
            callback(null, JSON.stringify(result));
        }

    })
}

function _getWikiWithCategory(category, callback){

    wiki.find({categories : category}, 'title abstract' ,  function (err, result) {

        if(err){
            callback(err);
        }
        else{
            callback(null, JSON.stringify(result));
        }
    })
}

module.exports = {
    getWiki : _getWiki,
    findWiki : _findWiki,
    getCategories : _getCategories,
    getWikiWithCategory : _getWikiWithCategory
}