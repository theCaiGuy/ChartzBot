export class ImageService {
    HTTPS = require('https');
    botID = process.env.BOT_ID;
    authID = process.env.GROUPME_AUTH;
    MongoClient = require('mongodb').MongoClient;
    assert = require('assert');
    mongo_name = 'ds131687/heroku_ht08rkq2'
    db;

    constructor() {
        MongoClient.connect(process.env.MONGODB_URI, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to mongodb");
            db = client.db(mongo_name);
            client.close();
        });
    }

    getImageURL(imagePath) {
        options = {
            hostname: 'image.groupme.com',
            path: '/pictures',
            method: 'POST'
        };
        
        body = {
            "access_token" : authID,

        };
    }

}
