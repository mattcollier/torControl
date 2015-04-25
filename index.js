"use strict";

var v8  = require('v8');
v8.setFlagsFromString('--harmony_classes');
v8.setFlagsFromString('--harmony_object_literals');
v8.setFlagsFromString('--harmony_tostring');
v8.setFlagsFromString('--harmony_arrow_functions');

var
  fs = require('fs'),
  dataDir = __dirname + '/torControlData';

var mkdirSync = function (path) {
    try {
      fs.mkdirSync(path);
    } catch(e) {
      if ( e.code != 'EEXIST' ) throw e;
    }
  }

mkdirSync(dataDir);

var
  thsBuilder = require('node-ths'),
  ths = new thsBuilder(dataDir);

//var torPath = __dirname + '/tor/tor';
//ths.setTorCommand(torPath);
ths.start();

ths.on('bootstrap', function(bootstrapPhase) {
  console.log(bootstrapPhase.progress);
});

process.on('SIGINT', function() {
  if (ths.isTorRunning()) {
    ths.stop(function () {
      process.exit();
    });
  }
});
