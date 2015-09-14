#!/usr/bin/env node 
var path = require('path');
var feedFile = 'feeds.json';

var pdl = require(
    path.join(__dirname, 'lib', 'podcast-downloader.js')
);

if (typeof pdl[process.argv[2]] === "function") {
    pdl[process.argv[2]]();
} else {
    pdl.add(process.argv[2]);
}

