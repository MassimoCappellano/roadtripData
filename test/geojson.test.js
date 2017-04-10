'use strict';

const GeoJSON = require('geojson');

var data = [
  { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
  { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
  { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
];

var output = GeoJSON.parse(data, {Point: ['lat', 'lng']});

console.log(JSON.stringify(output, null, 2));

console.log('************************************************');



output = GeoJSON.parse(data, { Point: ['lat', 'lng'], include: ['name'] });

console.log(JSON.stringify(output, null, 2));

console.log('************************************************');

var singleobject = { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 }
 
output =  GeoJSON.parse(singleobject, {Point: ['lat', 'lng']});
 
console.log(JSON.stringify(output, null, 2));

console.log('************************************************');

var data2 = [
  {
    x: 0.5,
    y: 102.0,
    prop0: 'value0'
  },
  {
    line: [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]],
    prop0: 'value0',
    prop1: 0.0
  },
  {
    polygon: [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
    ],
    prop0: 'value0',
    prop1: {"this": "that"}
  }
];

output = GeoJSON.parse(data2, {'Point': ['x', 'y'], 'LineString': 'line', 'Polygon': 'polygon'})

console.log(JSON.stringify(output, null, 2));

console.log('************************************************');



