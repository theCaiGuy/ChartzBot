var HTTPS = require('https');
var botID = process.env.BOT_ID;
var authID = process.env.GROUPME_AUTH;
var mongoURI = process.env.MONGODB_URI;
var mongoName = 'ds131687/heroku_ht08rkq2';
var mongodb = require('mongodb');

module.exports = {
    getURL: function(imageName) {
        return "https://i.groupme.com/480x325.jpeg.9e20b71dd6af4b58bbd132d4a7dec009";
    }
};


//exports.getURL = getURL;

// function ImageService() {
//     //this.HTTPS = require('https');
//     //this.botID = process.env.botID;
//     //this.authID = process.env.authID;
// }

// // Returns a GroupMe image URL
// ImageService.prototype.getURL = function(imageName) {
//     return "https://i.groupme.com/480x325.jpeg.9e20b71dd6af4b58bbd132d4a7dec009";
// };

//module.exports = ImageService;

// export class ImageService {
//     HTTPS = require('https');
//     botID = process.env.BOT_ID;
//     authID = process.env.GROUPME_AUTH;
//     MongoClient = require('mongodb').MongoClient;
//     assert = require('assert');
//     mongo_name = 'ds131687/heroku_ht08rkq2'
//     db;

//     constructor() {
//         //MongoClient.connect(process.env.MONGODB_URI, function(err, client) {
//         //    assert.equal(null, err);
//         //    console.log("Connected successfully to mongodb");
//         //    db = client.db(mongo_name);
//         //    client.close();
//         //});
//     }

//     getImageURL(imageName) {
//         //options = {
//         //    hostname: 'image.groupme.com',
//         //    path: '/pictures',
//         //    method: 'POST'
//         //};
        
//        // body = {
//         //    "access_token" : authID,

//        // };
//        return "https://i.groupme.com/480x325.jpeg.9e20b71dd6af4b58bbd132d4a7dec009";
//     }

// }
