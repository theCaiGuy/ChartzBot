var HTTPS = require('https');
var botID = process.env.BOT_ID;
var authID = process.env.GROUPME_AUTH;
var mongoURI = process.env.MONGODB_URI;
var mongoName = 'ds131687/heroku_ht08rkq2';
//var mongodb = require('mongodb');

module.exports = {
    getURL: function(imageName) {
        return "https://i.groupme.com/2250x1650.jpeg.7928c292e49f4019811df0f5ba9d62b9";
    }
};
