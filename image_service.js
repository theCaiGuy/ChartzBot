export class ImageService {
    HTTPS = require('https');
    botID = process.env.BOT_ID;
    authID = process.env.GROUPME_AUTH;

    constructor() {}

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
