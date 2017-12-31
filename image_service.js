var fs = require('fs');
var data = fs.readFileSync('image_links.json');
var url = JSON.parse(data);

module.exports = {
    getList: function() {
        return "https://i.groupme.com/1066x1528.png.7a430ecaa3524cd4816ce5189e43c095";
    },

    getURL: function(imageName) {
        if (imageName.toLowerCase() == "arn") imageName = "All Right Now";
        imageName = imageName.toLowerCase();
        imageName = imageName.replace(/\s+/g, '');
        imageName = imageName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
        //imageName = imageName.replace(/\'/g, '');
        var possibleURL = "";
        for (var i = 0; i < url.songs.length; i++) {
            if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == imageName) return url.songs[i].url;
            else if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(imageName) != -1) possibleURL = url.songs[i].url;
        }
        return possibleURL;
    }
};
