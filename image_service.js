var fs = require('fs');
var data = fs.readFileSync('./image_links.json');
var url = JSON.parse(data);
const MAX_CHARS = 450;

module.exports = {
    getList: function() {
		return "https://i.groupme.com/1028x1492.png.2262fcab0f6c490f8eb36780698e24bf";
    },

    getURL: function(imageName) {
        if (imageName.toLowerCase() == "arn") imageName = "All Right Now";
        if (imageName.toLowerCase() == "fun fun fun") imageName = "Ffun";
        imageName = imageName.toLowerCase();
        imageName = imageName.replace(/\s+/g, '');
        imageName = imageName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
        var possibleURL = "";
        for (var i = 0; i < url.songs.length; i++) {
            if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == imageName) return url.songs[i].url;
            else if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(imageName) != -1) possibleURL = url.songs[i].url;
        }
        return possibleURL;
    },

    getPossibleSpellings: function(imageName) {
        var possible_corrections = [];
        for (var i = 0; i < imageName.length; i++) {
            // Check deletions
            possible_deletion = imageName.substring(0, i) + imageName.substring(i + 1);
            possible_corrections.push(possible_deletion);

            // Check letter swap
            if (i != imageName.length - 1) {
                possible_swap = imageName.substring(0, i) + imageName.charAt(i + 1) + imageName.charAt(i) + imageName.substring(i + 2);
                possible_corrections.push(possible_swap);
            }

            for (var letter = 0; letter < 26; letter++) {
                // Check insertions
                possible_insertion = imageName.substring(0, i) + (letter + 10).toString(36) + imageName.substring(i);
                possible_corrections.push(possible_insertion);

                // Check substitutions
                possible_substitution = imageName.substring(0, i) + (letter + 10).toString(36) + imageName.substring(i + 1);
                possible_corrections.push(possible_substitution);
            }
        }
        var possible_spellings = [];
        var seen_urls = [];
        for (var j = 0; j < possible_corrections.length; j++) {
            var possible_name = possible_corrections[j];
            possible_name = possible_name.toLowerCase();
            possible_name = possible_name.replace(/\s+/g, '');
            possible_name = possible_name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
            for (var k = 0; k < url.songs.length; k++) {
                if (url.songs[k].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == possible_name && possible_spellings.indexOf(url.songs[k].title) == -1) possible_spellings.push(url.songs[k].title);
                else if (url.songs[k].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(possible_name) != -1 && possible_spellings.indexOf(url.songs[k].title) == -1) possible_spellings.push(url.songs[k].title);
            }
        }
        possible_spellings.push("Careless Whisper");
        return possible_spellings;
    }
};
