var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
var image_getter = require('./image_service.js');

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^[Ss]how me*/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    process_request(request);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function process_request(request) {
  var botResponse, options, body, botReq, defaultResponse, song_title, song_url;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "",
    "attachments" : [
     ]
  };

  if (request.text.length <= 8) {
    handleEmpty(body, options);
  } else {
    song_title = request.text.substring(8);
    original_input = song_title
    if (song_title.toLowerCase() == "arn") song_title = "All Right Now";
    if (song_title.toLowerCase() == "fun fun fun") song_title = "Ffun";
    song_title = song_title.toLowerCase();
    song_title = song_title.replace(/\s+/g, '');
    song_title = song_title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
    if (song_title == "list") {
      handleList(body, options);
    } else if (song_title == "info") {
      handleInfo(body, options);
    } else if (song_title == "help") {
      handleHelp(body, options);
    } else if (song_title == "asurprise") {
      handleSurprise(body, options);
    } else if (song_title == "where") {
      handleLocation(body, options);
    } else if (song_title == "teasers") {
      handleTeasers(body, options);
    } else if (song_title == "everything") {
      handleEverything(body, options);
    } else if (song_title == "audio") {
      handleAudio(body, options);
    } else if (song_title == "cuffs") {
      handleCuffs(body, options);
    } else if (song_title == "mump") {
      handleMump(body, options);
    } else {
      handleSong(body, options, song_title, original_input);
    }
  }
}

// "Show me"
function handleEmpty(body, options) {
  body.text = "Usage: \'Show me [song title] | help | info | teasers | audio | everything | list | where\'";
  postMessage(body, options);
}

// "Show me list"
function handleList(body, options) {
  body.text = "Here's a list of chartz I have\n";
  body.text = "All charts can be found at " + process.env.CHART_LINK;
  body.attachments = [{
    "type" : "image",
    "url" : image_getter.getList()
  }];
  postMessage(body, options);
}

// "Show me info"
function handleInfo(body, options) {
  botResponse = "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "   LSJUMB Altoz Practice Bot   \n"
  botResponse = botResponse + "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "Usage: \'Show me [song title] | help | info | teasers | audio | everything | list | where\'";
  botResponse = botResponse + "Created by Michael Cai using Node.js in December 2017\n"
  botResponse = botResponse + "Based on a project by petemcgrath available at https://github.com/groupme/bot-tutorial-nodejs\n"
  botResponse = botResponse + "Source code available at https://github.com/theCaiGuy/ChartzBot\n"
  botResponse = botResponse + "All charts can be found at " + process.env.CHART_LINK +"\n"
  botResponse = botResponse + "For more information visit https://dev.groupme.com/\n"
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me help"
function handleHelp(body, options) {
  botResponse = "\'Show me [song title]\' to retrieve the indicated chart\n";
  botResponse = botResponse + "\'Show me list\' for a list of all available chartz\n";
  botResponse = botResponse + "\'Show me where\' to find the shak\n"
  botResponse = botResponse + "\'Show me a surprise\' for a pleasant surprise\n";
  botResponse = botResponse + "\'Show me teasers\' for teasers\n";
  botResponse = botResponse + "\'Show me everything\' for a link to all chartz\n";
  botResponse = botResponse + "\'Show me audio\' for a link to old albumz\n";
  botResponse = botResponse + "Ensure you are spelling the song title correctly\n";
  botResponse = botResponse + "For more troubleshooting help contact Wild Card\n";
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me a surprise"
function handleSurprise(body, options) {
  body.text = "https://drive.google.com/file/d/0Bxuq1AeTSJFQdTgyQzRSNjF6LXc/view?usp=sharing";
  postMessage(body, options);
}

// "Show me where"
function handleLocation(body, options) {
  body.text = "Be there or be square";
  body.attachments = [{
    "type" : "location",
    "lat" : "37.4315",
    "lng" : "-122.1615",
    "name" : "Shak"
  }];
  postMessage(body, options);
}

// "Show me teasers"
function handleTeasers(body, options) {
  var teaser_links = [
    "https://i.groupme.com/1118x794.png.e26b5355f5f54bc198d953b2352f9f5a",
    "https://i.groupme.com/1102x782.png.a24a75dbf4d8429aa8e5b886623d5603",
    "https://i.groupme.com/1106x782.png.d153cb1c0f8b408485ed3953810bb8e3",
  ]
  for (var i = 0; i < teaser_links.length; i++) {
    image_url = teaser_links[i];
    body.attachments = [{
      "type": "image",
      "url" : image_url
    }]
    postMessage(body, options);
  }
}

// "Show me everything"
function handleEverything(body, options) {
  body.text = "All charts can be found at " + process.env.CHART_LINK;
  postMessage(body, options);
}

// "Show me audio"
function handleAudio(body, options) {
  body.text = "Old albumz can be found at " + process.env.ALBUM_LINK;
  postMessage(body, options);
}

// "Show me [song title]"
function handleSong(body, options, song_title, original_input) {
  var found_song = image_getter.getURL(song_title);
  var image_url = found_song[0];
  var found_title = found_song[1];
  if (image_url == "") {
    var possible_spellings = image_getter.getPossibleSpellings(original_input);
    body.text = "Sorry, I couldn't find your chart \'" + original_input + "\'. Did you mean: \n"
    for (var i = 0; i < possible_spellings.length; i++) {
      body.text = body.text + possible_spellings[i] + "\n";
    }
    body.text = body.text + "Try \'Show me list\' for a list of all the chartz I have or \'Show me help\' for troubleshooting help."
  } else {
    body.text = "Here's your song: " + found_title;
    body.attachments = [{
      "type" : "image",
      "url" : image_url
    }]
  }
  postMessage(body, options);
}

// "Show me cuffs"
function handleCuffs(body, options) {
  body.text = "Look at this BEAUTY";
  body.attachments = [{
    "type" : "image",
    "url" : "https://i.groupme.com/1484x2056.jpeg.e73436c4c34244e9a6a33ce6425edb72"
  }]
  postMessage(body, options);
}

// "Show me mump"
function handleMump(body, options) {
  body.text = "Sign this petition! http://chng.it/SKdnt2Vh";
  postMessage(body, options);
}

// Post message to groupme API
function postMessage(body, options) {
  var botResponse = body.text;

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
