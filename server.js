/*
  Copyright 2017 Michael Finkler (info@dasfink.com)
  
  Licensed under CC BY-NC-SA 1.0
*/


// server.js
'use strict';

process.env.DEBUG = 'actions-on-google:*';


// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Promise = require('bluebird');
var ApiAiApp = require('actions-on-google').ApiAiApp;


var utils = require('./utils.js');
var constants = require('./constants.js');

app.use(bodyParser.json({type: 'application/json'}));


var getPlantFactResponse = function(speciesInfo) {
	var response = '';
	if(speciesInfo.Commonname) 
		response = speciesInfo.Commonname + ' which is also known as ';
	
	response += speciesInfo.Latinname + '.'; 
	response += utils.getRandomFact(speciesInfo);

	return response;
};

///Returns the response when selecting a plant.
var getInitialPlantResponse = function(info) {
  var plantFact = {};
  var factType = 'Usesnotes';
        
  var plantName = utils.getPlantName(info);
  var plantFact = getPlantFact(info, factType, 'is a plant?', 0);
  var fact = 'Some uses are as ' + plantFact.result;
  var hasFact = plantFact.hasFact;
      
  if(!hasFact) {
    factType = "Edibleuses";
    plantFact = getPlantFact(info, factType, '', 0);
    hasFact = plantFact.hasFact;
    fact = 'It\'s  edible! ' + plantFact.result;
  }
  if(!hasFact) {
    factType = "Medicinal";
    plantFact = getPlantFact(info, factType, '', 0);
    hasFact = plantFact.hasFact;
    fact = 'It\'s  medicinal! ' + plantFact.result;
  }
  if(!hasFact) {
    factType = "Habitat";
    plantFact = getPlantFact(info, factType, '', 0);
    hasFact = plantFact.hasFact;
    fact = 'Is found in habitat! ' + plantFact.result;
  }
  if(!hasFact && plantName != info.Latinname) { 
    hasFact = true;
    fact = ' is known as ' + info.Latinname;
  }

  console.log('fact ' + fact);
  
  //fact =  fact + '. Do you want to know more?';
  //getPlantFactResponse(info);
  
  var prompts =     
  ['You can ask about a plant, if a plant is edible, if it has medical properties and also about conditions that a plant prefers.',
    'You can ask for a random fact, ask me to find a new plant or talk to me about your garden.',
    'We can stop here, see you next time!'];
  
  return { result: fact, prompts: prompts, hasFact: hasFact, plantName: plantName, plantFact: plantFact};
        
};

var getPlantFact = function(plantObj, fieldName, fallbackString, index) {
  index = (index) ? index : 0;
  var lastIndex = index;
  var factString = plantObj[fieldName];
  
  var facts = utils.tokenizeFacts(factString);
  if(facts.length == 0 || facts[0] == 'None known')
    return {"factString": fallbackString, 
            "lastIndex": 0, 
            "hasFact": false};
  
  
  var factString = facts[index];
  
  if(factString.length <= 80 && facts[index+1]) 
  {
    factString += facts[index+1];
    lastIndex++;
  }

  if(facts.lenght > lastIndex) {
    factString += '.  Do you want to know more?';
  } else {
    factString += '.  Do you want to know another fact?';
  }
  
  return {"result": factString, 
          "lastIndex": 0, 
          "hasFact": true};
};

var getResponses = function(providedResponse, user) { 
  var response = providedResponse || 'What other plant do you want to know about?';
  var prompts =     ['You can ask about a plant, if a plant is edible, if it has medical properties and also about conditions that a plant prefers.',
    'You can ask for a random fact, ask me to find a new plant or talk to me about your garden.',
    'We can stop here, see you next time!'];
  return { response: response, prompts: prompts };
};

var getUnknownPlantFallback = function(name) {
  var fallback_message = `I don\'t know about ${plantName}
          would you like to learn about another plant?`, plantName;
};


app.post('/permaculture-brain', function(request, response) {
  
  const apiai = new ApiAiApp({request: request, response: response});
  
  ///Gets a plant based on the provided name and returns the common name and
  ///a random fact.
  function plantSelection(apiai) {
    var plantName = apiai.getArgument(constants.PLANTNAMES_VARIABLE);
    console.log('Plant name ' + plantName);
    utils.getSpeciesInfo(plantName)
      .then(function(info) {

        var response = getInitialPlantResponse(info);
        if(response.hasFact) {
          var result =  response.plantName + '. ' + response.result; 
          apiai.ask(result, response.prompts);
        } else {
          apiai.ask(getUnknownPlantFallback(plantName));
        }
      })
      .catch(function(err) {
        console.log(err);
        apiai.ask(getUnknownPlantFallback(name));
      });

  };
  
  
  ///Returns a random plant from the database.
  function plantRandom(apiai) {
    var plantName = apiai.getArgument(constants.PLANTNAMES_VARIABLE);
    
    var info = utils.getRandomPlant()
      .then(function(info) {
        var response = getInitialPlantResponse(info);
        if(response.hasFact) {
          var params = {};
          params[constants.PLANTNAMES_VARIABLE] = info.Latinname;
          apiai.setContext(constants.PLANT_SELECTION_CONTEXT, constants.PLANT_SELECTION_CONTEXT_TTL, params);
          
          var result = 'I was able to dig up ' + response.plantName + '. ' + response.result; 
          
          apiai.ask(result, response.prompts);
        } else {
          apiai.ask(getUnknownPlantFallback(plantName));
        }

      }).catch(function(err) {
        console.log(err);
        var response = 'I wasn\'t able to find a plant.  Something must be wrong, try back later';
        apiai.tell(response);
      });
  };
  
  //Returns a fact for a plant
  function getPlantFacts(apiai) {
    var plantName = apiai.getArgument(constants.PLANTNAMES_VARIABLE);
    var plantFactsType = apiai.getArgument(constants.PLANT_FACT_TYPES);
    console.log('Fact type ' + plantFactsType);
    console.log('PlantName ' + plantName);
    
    
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info, 
                                  plantFactsType, 
                                  'Not that I know of, what else can I tell you?' );
        var responses = getResponses(result.factString, null);
      
        var lastIndex = result.lastIndex;

        var params = {
          "lastFactType": plantFactsType,
          "lastFactIndex": lastIndex 
        };
        
        
        apiai.setContext(constants.PLANTFACTS_FOLLOWUP, 2, params);
        apiai.ask(responses.result,responses.prompts);
      })
      .catch(function(err) {
        apiai.ask(getUnknownPlantFallback(name));
      });
  };
  
  function repeatLastFact(apiai) {
    var plantName = apiai.getArgument(constants.PLANTNAMES_VARIABLE);
    var plantFactsType = apiai.getArgument(constants.PLANT_FACT_TYPES);
    var lastPlantFactType = apiai.getArgument("lastFactType") || plantFactsType;
    var lastIndex = apiai.getArgument("lastIndex") || 0;
    
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info,
                                  plantFactsType,
                                  'I do not have any info about that.',
                                  lastIndex);
      
        var lastIndex = result.lastIndex;
        var params = {
          "lastFactType": plantFactsType,
          "lastFactIndex": lastIndex 
        };
        
        apiai.setContext(constants.PLANTFACTS_FOLLOWUP, 2, params);
        apiai.ask(result.factString);
      })
      .catch(function(err) {
        apiai.ask(getUnknownPlantFallback(name));
      });
    
  };
  console.log(constants);
  console.log('const: ' + constants.PLANT_SELECTION)
  
  let actionMap = new Map();
  actionMap.set(constants.PLANT_SELECTION, plantSelection);
  actionMap.set(constants.PLANT_RANDOM, plantRandom);
  actionMap.set(constants.PLANT_FACTS, getPlantFacts);
  actionMap.set(constants.PLANT_FACTS_REPEAT, repeatLastFact);
  apiai.handleRequest(actionMap);

});
//END app.post


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
