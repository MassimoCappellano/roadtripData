'use strict';

var Promise = require('es6-promise').Promise,
    Googlemaps = require('googlemaps'),
    polyline = require('polyline'),
    geojson = require('geojson'),
    fs = require('fs'),
    util = require('util');

var output = "mia_line_rotta", // name of the output file
    start = "Via Respigi, 6, 21017 Samarate, IT",
    end = "Via Valtellina, 68, 20159 Milano",
    // waypoints is a string with values separated by |
    waypoints = "";

var env = require('env2')('./.env');

var apiKey = process.env.GMAP_KEY;

console.log('>> apiKey:', apiKey);

var googlemaps = new Googlemaps({'key': apiKey});

function getGoogleRouteInformation(origin, destination, waypoints) {
  return new Promise(function(resolve, reject){

    if (!origin || !destination) {
      console.error('Origin and destination required!')
    }

    function handleResponse(err, data) {
      if (data.status == "OK") {
        resolve(data);
      } else {
        reject('There was a problem getting the data from Google: ', err);
      }
    };

    var params = {origin: origin,destination: destination, waypoints: waypoints};
    googlemaps.directions(params, handleResponse);
    });
}

function handleError(err) {
  console.error(err);
};

getGoogleRouteInformation(start, end, waypoints)
// Decode the polyline info from Google
.then(function(data){

  var encodedPolyline = data.routes[0].overview_polyline,
      decodedPolyline;

  decodedPolyline = polyline.decode(encodedPolyline.points);

  return decodedPolyline;

}, handleError)
// Convert the array of arrays into an array of objects
.then(function(points){

  var normalized = [];

  points.forEach(function(rawPoints){

    var value = [rawPoints[1], rawPoints[0]];

    return normalized.push(value);

  });

  return normalized;

}, handleError)
// Encode the array into proper geoJSON
.then(function(normalizedPoints){
  
  var data = {
    line: normalizedPoints,
    start: start,
    end: end
  };

  var geoData = geojson.parse(data, { 'LineString': 'line' });

  return geoData;

}, handleError)
// Write out the file
.then(function(geoData){

  fs.writeFile('geojson/' + output + '.geojson', JSON.stringify(geoData, null, 2));

  console.log('Successfully created file ' + output)

}, handleError)
.catch(handleError);
