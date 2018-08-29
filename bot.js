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
    if (song_title == "list") {
      handleList(body, options);
    } else if (song_title == "info") {
      handleInfo(body, options);
    } else if (song_title == "help") {
      handleHelp(body, options);
    } else if (song_title == "a surprise") {
      handleSurprise(body, options);
    } else if (song_title == "where") {
      handleLocation(body, options);
    } else if (song_title == "teasers") {
      handleTeasers(body, options);
    } else {
      handleSong(body, options, song_title);
    }
  }
}

// "Show me"
function handleEmpty(body, options) {
  body.text = "Usage: \'Show me [song title] | help | info | list | where\'";
  postMessage(body, options);
}

// "Show me list"
function handleList(body, options) {
  body.text = "Here's a list of chartz I have: "
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
  botResponse = botResponse + "Usage: \'Show me [song title] | help | info | list | where\'\n";
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
  botResponse = botResponse + "Ensure you are spelling the song title correctly\n";
  botResponse = botResponse + "For more troubleshooting help contact Wild Card\n"
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me a surprise"
function handleSurprise(body, options) {
  body.text = "https://www.youtube.com/watch?v=izGwDsrQ1eQ";
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
  body.text = "Tease me daddy";
  postMessage(body, options);
  body.text = "";
  sleep(1000);
  var teaser_links = [
    "https://i.groupme.com/1594x1170.png.7d69be0d057b46d996538963de29e56b",
    "https://i.groupme.com/1596x1168.png.bbf31a6b03744690bfa3404a57102a4c",
    "https://i.groupme.com/1598x1174.png.baa83bcbef0145c68a4f9675380b54e2",
    "https://i.groupme.com/1594x1166.png.a2b3f8f0b4cd4057a6ed62a6b4c01890"
  ]
  for (var i = 0; i < teaser_links.length; i++) {
    image_url = teaser_links[i];
    body.attachments = [{
      "type": "image",
      "url" : image_url
    }]
    postMessage(body, options);
    sleep(1000);
  }
}

// "Show me [song title]"
function handleSong(body, options, song_title) {
  var image_url = image_getter.getURL(song_title);
  if (image_url == "") {
    var possible_spellings = image_getter.getPossibleSpellings(song_title);
    body.text = "Sorry, I couldn't find your chart \'" + song_title + "\'. Did you mean: \n"
    for (var i = 0; i < possible_spellings.length; i++) {
      body.text = body.text + possible_spellings[i] + "\n";
    }
    body.text = body.text + "Try \'Show me list\' for a list of all the chartz I have or \'Show me help\' for troubleshooting help."
  } else {
    body.text = "Here's your song: " + song_title;
    body.attachments = [{
      "type" : "image",
      "url" : image_url
    }]
  }
  postMessage(body, options);
}

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

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


exports.respond = respond;
