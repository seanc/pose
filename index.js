'use strict';

/* jshint unused: false */
let lib = require('./lib'),
    argv = process.argv.slice(2),
    bco = require('bco'),
    os = require('os'),
    fs = require('fs-extra');

global.pose = {};

lib.utils(pose);

if(!fs.existsSync(pose.getPoseHome())) {
   lib.install();
   return;
}

let commands = [
   'save',
   'delete',
   'update',
   'create',
   'list-saves',
   'help'
];

let args = argv;
if(commands.indexOf(args[0]) > -1) {
   lib[args[0]].call(null, args.slice(1));
} else {
   console.log('Unknown Command');
   pose.close();
}
