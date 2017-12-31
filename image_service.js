var fs = require('fs');
var data = fs.readFileSync('./image_links.json');
var url = JSON.parse(data);
const MAX_CHARS = 450;

module.exports = {
    getList: function() {
		var songlist = [];
		var curr_list = "";
		url.songs.sort(function(a, b) {
			return (a.title) - (b.title);
		});
		for (var i = 0; i < url.songs.length; i++) {
			if (curr_list.length + url.songs[i].title.length > 450) {
				songlist.push(curr_list);
				curr_list = url.songs[i].title + "\n";
			} else {
				curr_list = curr_list + url.songs[i].title + "\n";
			}
		}
		songlist.push(curr_list);
        return songlist;
    },

    getURL: function(imageName) {
        if (imageName.toLowerCase() == "arn") imageName = "All Right Now";
        imageName = imageName.toLowerCase();
        imageName = imageName.replace(/\s+/g, '');
        imageName = imageName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
        var possibleURL = "";
        for (var i = 0; i < url.songs.length; i++) {
            if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == imageName) return url.songs[i].url;
            else if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(imageName) != -1) possibleURL = url.songs[i].url;
        }
        return possibleURL;
    }
};
