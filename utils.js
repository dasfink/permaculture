/*
  Copyright 2017 Michael Finkler (info@dasfink.com) 
  Licensed under CC BY-NC-SA 1.0
*/

// utils.js
// ========

var constants = require('./constants.js');
var db = require('sqlite');
db.open('.data/plants.db', { cached: true, verbose: true, Promise });

var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
 
  runGetQuery: function(query, params) {
    console.log('query: ' + query);
    console.log(params);
    
    
	  return new Promise((resolve, reject) => {
		  db.get(query, params).then(function(row) { resolve(row); });
	  });
  },
  
  runAllQuery: function(query, params) {
    console.log(params);
    return new Promise((resolve, reject) => {
		  db.all(query, params).then(function(rows) { resolve(rows); });
	  });
  },

 getSpeciesInfo: function(name) {
    name = name.toLowerCase();
	  var queryLatinName  = "SELECT * FROM `Species List` WHERE lower(Latinname) = ?";
    var queryCommonName = "SELECT * FROM `Species List` WHERE lower(Commonname) = ?";
    var queryAlternativeMatches = 
        "SELECT * FROM `Species List` WHERE Commonname like ? OR Latinname like ?";
	  return new Promise((resolve, reject) =>
	  { 
      Promise.all([this.runGetQuery(queryLatinName, name), 
                   this.runGetQuery(queryCommonName, name),
                   this.runAllQuery(queryAlternativeMatches, ['%'+name+'%', '%'+name+'%'])                 
                  ])
        .then(function(results) {
      
        var latinResult = results[0];
        var commonResult = results[1];
        var alternativePlants = results[2];
        
        //console.log('alternatives: ' + alternativePlants.length)
      
        var result = null;
        
        if(latinResult != undefined) result = latinResult;
        else if(commonResult != undefined) result = commonResult;
      
        if(result) {
          resolve(result);
        } else {
          reject ('Could not find info for ' + name);
        }
      });
    
	  });
  },
  
  getPlantName: function(speciesInfo) {
    var name = speciesInfo.Commonname || speciesInfo.Latinname;
    return name;
  },
  
  getRandomPlant: function() {
    var allPlantsQuery = 'SELECT * FROM `Species List` WHERE Usesnotes <> ?';
    
    var randomNumber = Math.random();
    
    if(randomNumber > .3) {
      allPlantsQuery += ' AND (MedicinalRating > 0 OR EdibilityRating > 0) '
    }
    
    console.log(allPlantsQuery);
    
    
    
    return new Promise((resolve, reject) => {
      this.runAllQuery(allPlantsQuery, [constants.UNKNOWN_FACT])
      .then(function(plants) {
        console.log(plants.length);
        if(plants.length == 0)
          reject('No plants found.');
        
        var randomNumber = getRandomInt(0,plants.length-1);
        
        resolve(plants[randomNumber]);
      });
    });
  },


  tokenizeFacts: function(factString) {
	  var facts = [];
	  //console.log('in tokenizeFacts');
	  if(factString == constants.UNKNOWN_FACT)
		  return facts;

	  var regex = /\[[\d,\s]+\]/
  	facts = factString.split(regex);

	  return facts;
  },

  getRandomFact: function(speciesInfo) {
	  var facts = this.tokenizeFacts(speciesInfo.Usesnotes);
	  if(facts.length == 0 ) return '';

  	var rand = getRandomInt(0, facts.length-1);
	  var fact = facts[rand];

	  fact = fact.replace(/^[\s\.]+|\s+$/gi,'');

	  return fact;
  },

  removeReferences: function(str) {
	  return str.replace(/\[[\d,\s]*\]/gi, '');
  }
};