var fs = require('fs');
var data = fs.readFileSync('./locations.json');
var places = JSON.parse(data);

module.exports = {
    getLocation: function(location) {
        location = location.toLowerCase();
        location = location.replace(/\s+/g, '');
        location = location.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
        var possibleLocation = {};
        for (var i = 0; i < places.locations.length; i++) {
            if (places.locations[i].name.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == location) return places.locations[i];
            else if (places.locations[i].name.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(location) != -1) possibleLocation = places.locations[i];
        }
        return possibleLocation;
    }
};
