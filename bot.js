var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
var image_getter = require('./image_service.js');

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^Show me*/;

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
       {
         "type" : "image",
         "url" : ""
       }
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
    } else {
      handleSong(body, options, song_title);
    }
  }
}

// "Show me"
function handleEmpty(body, options) {
  body.text = "Usage: \'Show me [song title] | help | info | list\'";
  postMessage(body, options);
}

// "Show me list"
function handleList(body, options) {
  body.text = botResponse = "Choose any chart from this list:\n"
  body.attachments[0].url = image_getter.getList();
  postMessage(body, options);
}

// "Show me info"
function handleInfo(body, options) {
  botResponse = "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "   LSJUMB Altoz Practice Bot   \n"      
  botResponse = botResponse + "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "Usage: \'Show me [song title] | help | info | list\'\n";
  botResponse = botResponse + "Created by Michael Cai using Node.js in December 2017\n"
  botResponse = botResponse + "Based on a project by petemcgrath available at https://github.com/groupme/bot-tutorial-nodejs\n"
  botResponse = botResponse + "Source code available at https://github.com/theCaiGuy/GroupmeBotting\n"
  botResponse = botResponse + "All charts can be found at " + process.env.CHART_LINK +"\n"
  botResponse = botResponse + "For more information visit https://dev.groupme.com/\n"
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me help"
function handleHelp(body, options) {
  botResponse = "\'Show me [song title]\' to retrieve the indicated chart\n";
  botResponse = botResponse + "\'Show me list\' for a list of all available chartz\n";
  botResponse = botResponse + "\'Show me a surprise\' for a pleasant surprise\n";
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me a surprise"
function handleSurprise(body, options) {
  body.text = "https://www.youtube.com/watch?v=izGwDsrQ1eQ";
  postMessage(body, options);
}

// "Show me [song title]"
function handleSong(body, options, song_title) {
  body.attachments[0].url = image_getter.getURL(song_title)
  if (body.attachments[0].url == "") {
    body.text = "Sorry, I couldn't find your chart \'" + song_title + "\'. Try \'Show me list\' for a list of all the chartz I have or \'Show me help\' for troubleshooting help.";
  } else {
    body.text = "Here's your song: " + song_title;
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


exports.respond = respond;