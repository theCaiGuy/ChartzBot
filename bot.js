var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^Show me*/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage(request);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(request) {
  var botResponse, options, body, botReq;

  if (request.text.length <= 8) botResponse = "Usage: 'Show me <song title> | help'";
  else {
    song_title = request.text.substring(8);
    if (song_title == "help") {
      botResponse = "Here's what I've got: \n"
      botResponse = botResponse + "Lucretia\n";
      botResponse = botResponse + "ARN\n";
      botResponse = botResponse + "Banner\n"
    } else if (song_title == "info") {
      botResponse = "|||||||||||||||||||||||||||||||||||||||||||||\n"
      botResponse = botResponse + "   LSJUMB Altoz Practice Bot   \n"      
      botResponse = botResponse + "|||||||||||||||||||||||||||||||||||||||||||||\n"
      botResponse = botResponse + "Created by Michael Cai using Node.js in December 2017\n"
      botResponse = botResponse + "Based on a project by petemcgrath available at https://github.com/groupme/bot-tutorial-nodejs\n"
      botResponse = botResponse + "Source code available at https://github.com/theCaiGuy/GroupmeBotting\n"
      botResponse = botResponse + "All charts can be found at https://drive.google.com/drive/folders/0BxPTAb-07dorUG5EQU5ENmJ5Mm8\n"
      botResponse = botResponse + "For more information visit https://dev.groupme.com/"
    } else {
      botResponse = "Here's your song: " + request.text.substring(8);
    }
  }
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

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