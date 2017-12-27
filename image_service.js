var HTTPS = require('https');
var botID = process.env.BOT_ID;
var authID = process.env.GROUPME_AUTH;
var mongoURI = process.env.MONGODB_URI;
var mongoName = 'ds131687/heroku_ht08rkq2';
//var mongodb = require('mongodb');

module.exports = {
    getURL: function(imageName) {
        return "https://i.groupme.com/480x325.jpeg.9e20b71dd6af4b58bbd132d4a7dec009";
    }
};
