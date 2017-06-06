// server.js
'use strict';

process.env.DEBUG = 'actions-on-google:*';

//Action names
const PLANT_SELECTION = 'Plant.selection';
const PLANT_FACTS = 'Plant.facts';
const PLANT_EDIBLE = 'Plant.edible';
const PLANT_MEDICINAL = 'Plant.medicinal';
const PLANT_RANDOM = 'Plant.random';

//Variable names
const PLANTNAMES_VARIABLE = 'Plantnames';
const SELECTION_CRITERIA = 'Selection-criteria';
const PLANT_FACT_TYPES = 'Plant-fact-types';

//Context names
const PLANT_SELECTION_CONTEXT = 'plant-selected';
const PLANTFACTS_FOLLOWUP = 'Plantfacts-followup';

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Promise = require('bluebird');
var ApiAiApp = require('actions-on-google').ApiAiApp;


var constants = require('./constants.js')
var utils = require('./utils.js');

app.use(bodyParser.json({type: 'application/json'}));


var getPlantFactResponse = function(speciesInfo) {
	var response = '';
	if(speciesInfo.Commonname) 
		response = speciesInfo.Commonname + ' is also known as ';
	
	response += speciesInfo.Latinname + '.'; 
	response += utils.getRandomFact(speciesInfo);

	return response;
};


var getPlantFact = function(plantObj, fieldName, fallbackString, index) {
  index = (index) ? index : 0;
  var lastIndex = index;
  var factString = plantObj[fieldName];
  
  console.log(fieldName);
  var facts = utils.tokenizeFacts(factString);
  if(facts.length == 0 || facts[0] == 'None known')
    return {"factString": fallbackString, 
            "lastIndex": 0, 
            "hasFact": false};
  
  
  var factString = facts[index];
  
  if(factString.length <= 140 && facts[index+1]) 
  {
    factString += facts[index+1];
    lastIndex++;
  }
  
  return {"factString": factString, 
            "lastIndex": 0, 
            "hasFact": true};
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
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    console.log('Plant name ' + plantName);
    utils.getSpeciesInfo(plantName)
      .then(function(info) {

        var plantFact = {};
        var factType = 'Usesnotes';
        
        var returnName = utils.getPlantName(info);
        var plantFact = getPlantFact(info, factType, 'is a plant?', 0);
        var fact = plantFact.factString;
        var hasFact = plantFact.hasFact;
      
        if(!hasFact) {
          factType = "Edibleuses";
          plantFact = getPlantFact(info, factType, '', 0);
          hasFact = plantFact.hasFact;
          fact = 'is edible? ' + plantFact.factString;
        }
        if(!hasFact && returnName != plantName.Latinname) { 
          hasFact = true;
          fact = ' is known as ' + plantName.Latinname;
        }

        if(!hasFact && fact) {
          apiai.ask(getUnknownPlantFallback(name));
        }
        var result = 'Did you know that ' + utils.getPlantName(info) + ' ' + fact;
        //getPlantFactResponse(info);
        apiai.ask(result);
      })
      .catch(function(err) {
        console.log(err);
        apiai.ask(getUnknownPlantFallback(name));
      });

  };
  
  ///Returns a response related to the plants edibility 
  function isPlantEdible(apiai) {
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info, 'Edibleuses', 'Not edible');
        apiai.ask(result);
      })
      .catch(function(err) {
        
        apiai.ask(getUnknownPlantFallback(name));
      });
  };
  
    ///Returns a response related to the plants edibility 
  function isPlantMedicinal(apiai) {
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info, 'Medicinal', 'Not medicinal' );
        apiai.ask(result);
      })
      .catch(function(err) {
        apiai.ask(getUnknownPlantFallback(name));
      });
  };
  
  ///Returns a random plant from the database.
  function plantRandom(apiai) {
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    var selectionCritieria = apiai.getArgument(SELECTION_CRITERIA);
    
    console.log(selectionCritieria);
    
    var info = utils.getRandomPlant()
      .then(function(info) {
        var result = 'Your plant is ' + getPlantFactResponse(info);
        
        var params = {};
        params[PLANTNAMES_VARIABLE] = info.Latinname;
        apiai.setContext(PLANT_SELECTION_CONTEXT, 5, params);
        apiai.ask(result);
      }).catch(function(err) {
        console.log(err);
        apiai.ask('Dear me, something must have gone wrong. I wasn\'t able to find a plant.')
      });
  };
  
  function getPlantFacts(apiai) {
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    var plantFactsType = apiai.getArgument(PLANT_FACT_TYPES);
    console.log('Fact type ' + plantFactsType);
    console.log('PlantName ' + plantName);
    
    
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info, plantFactsType, 'I do not have any info about that.');
        var lastIndex = result.lastIndex;
        console.log(lastIndex);
        var params = {
          "lastFactType": plantFactsType,
          "lastFactIndex": lastIndex 
        };
        
        apiai.setContext(PLANTFACTS_FOLLOWUP, 2, params);
        apiai.ask(result.factString);
      })
      .catch(function(err) {
        apiai.ask(getUnknownPlantFallback(name));
      });
  };
  
  function repeatLastFact(apiai) {
    var plantName = apiai.getArgument(PLANTNAMES_VARIABLE);
    var plantFactsType = apiai.getArgument(PLANT_FACT_TYPES);
    var lastPlantFactType = apiai.getArgument("lastFactType") || plantFactsType;
    var lastIndex = apiai.getArgument("lastIndex") || 0;
    
    utils.getSpeciesInfo(plantName)
      .then(function(info) {
        var result = getPlantFact(info,
                                  plantFactsType,
                                  'I do not have any info about that.',
                                  lastIndex);
      
        var lastIndex = result.lastIndex;
        console.log(lastIndex);
        var params = {
          "lastFactType": plantFactsType,
          "lastFactIndex": lastIndex 
        };
        
        apiai.setContext(PLANTFACTS_FOLLOWUP, 2, params);
        apiai.ask(result.factString);
      })
      .catch(function(err) {
        apiai.ask(getUnknownPlantFallback(name));
      });
    
  };
  
  let actionMap = new Map();
  actionMap.set(PLANT_SELECTION, plantSelection);
  actionMap.set(PLANT_RANDOM, plantRandom);
  actionMap.set(PLANT_EDIBLE, isPlantEdible);
  actionMap.set(PLANT_MEDICINAL, isPlantMedicinal);
  actionMap.set(PLANT_FACTS, getPlantFacts);
  actionMap.set('Plantfacts.Plantfacts-repeat', repeatLastFact);
  apiai.handleRequest(actionMap);

});
//END app.post


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
