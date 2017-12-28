var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
var image_getter = require('./image_service.js');

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
  var botResponse, options, body, botReq, defaultResponse, song_title, song_url;

  defaultResponse = "Usage: \'Show me <song title> | help | info | list\'";

  if (request.text.length <= 8) {
    botResponse = defaultResponse;
    song_url = "";
  }
  else {
    song_title = request.text.substring(8);
    if (song_title == "list") {
      botResponse = "Here's what I've got: \n"
      //botResponse = botResponse + image_getter.getList();
    } else if (song_title == "info") {
      botResponse = "|||||||||||||||||||||||||||||||||||||||||||||\n"
      botResponse = botResponse + "   LSJUMB Altoz Practice Bot   \n"      
      botResponse = botResponse + "|||||||||||||||||||||||||||||||||||||||||||||\n"
      botResponse = botResponse + defaultResponse + "\n";
      botResponse = botResponse + "Created by Michael Cai using Node.js in December 2017\n"
      botResponse = botResponse + "Based on a project by petemcgrath available at https://github.com/groupme/bot-tutorial-nodejs\n"
      botResponse = botResponse + "Source code available at https://github.com/theCaiGuy/GroupmeBotting\n"
      botResponse = botResponse + "All charts can be found at " + process.env.CHART_LINK +"\n"
      botResponse = botResponse + "For more information visit https://dev.groupme.com/\n"
    } else if (song_title == "help") {
      botResponse = "Retrieves the indicated chart\n"
      botResponse = botResponse + defaultResponse;
    } else {
      song_url = image_getter.getURL(song_title)
      if (song_url == "") {
        botResponse = "Sorry, I couldn't find your chart. Try \'Show me list\' for a list of all the chartz I have";
      } else {
        botResponse = "Here's your song: " + song_title;
      }
    }
  }
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
       {
         "type" : "image",
         "url" : song_url
       }
     ]
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