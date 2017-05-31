// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({type: 'application/json'}));

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

let db = require('sqlite');
let Promise = require('bluebird');
let ApiAiApp = require('actions-on-google').ApiAiApp;

db.open('.data/plants.db', { cached: true, verbose: true, Promise });

var runSpeciesInfoGetQuery = function(query, params) {
	return new Promise((resolve, reject) => {
		db.get(query, params).then(function(row) { resolve(row); });
	});
};

var getSpeciesInfo = function(name) {

	var queryLatinName  = "SELECT * FROM `Species List` WHERE Latinname= ?";
  var queryCommonName = "SELECT * FROM `Species List` WHERE Commonname = ?";
  
	return new Promise((resolve, reject) =>
	{ 
    Promise.all([runSpeciesInfoGetQuery(queryLatinName, name), 
                 runSpeciesInfoGetQuery(queryCommonName, name)])
      .then(function(results) {
      
      var latinResult = results[0];
      var commonResult = results[1];
      
      var result = latinResult || commonResult;
      
      if(result) {
        resolve(result);
      } else {
        reject ('Could not find info for ' + name);
      }
    });
    
	});
};

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var tokenizeFacts = function(speciesInfo) {
	var facts = [];
	//console.log('in tokenizeFacts');
	if(speciesInfo.Usesnotes == 'None known')
		return facts;

	var regex = /\[[\d,\s]+\]/
	facts = speciesInfo.Usesnotes.split(regex);

	return facts;
};

var getRandomFact = function(speciesInfo) {
	var facts = tokenizeFacts(speciesInfo);
	if(facts.length == 0 ) return '';

	var rand = getRandomInt(0, facts.length-1);
	var fact = facts[rand];

	fact = fact.replace(/^[\s\.]+|\s+$/gi,'');

	return fact;
};

var removeReferences = function(str) {
	return str.replace(/\[[\d,\s]*\]/gi, '');
};

var getPlantSpeechResponse = function(speciesInfo) {
	var response = '';
	if(speciesInfo.Commonname) 
		response = speciesInfo.Commonname + ' is also known as ';
	
	response += speciesInfo.Latinname + '.'; 
	response += getRandomFact(speciesInfo);

	return response;
};

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.post('/permaculture-brain', function(request, response) {
  //console.log(request);
  if (request.body.result.parameters.Plantnames === undefined) {
    // This is an error case, as "message" is required.
    response.status(400).send('No plant defined!');
  } else {
    // Everything is okay.
    var plantName = request.body.result.parameters.Plantnames;

    getSpeciesInfo(plantName)
    .then(function(info) {
    	//console.log(info);
    	var result = getPlantSpeechResponse(info);
      
    	response.status(200).send({ speech: result});
    }).catch(function(err) {
    	response.status(200).send(err);
    });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
