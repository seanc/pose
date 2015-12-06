'use strict';

let rl = require('readline').createInterface(process.stdin, process.stdout),
   path = require('path'),
   fs = require('fs-extra-promise');

function install() {
   fs
      .mkdirAsync(pose.getPoseHome())
      .then((err) => console.log((err) ? 'Error: ' + err : 'Pose directory created'))
      .then(() => fs.mkdirAsync(path.join(pose.getPoseHome(), 'saves')))
      .then((err) => console.log((err) ? 'Error: ' + err : 'Pose saves directory created'));
}

module.exports = function() {
   (function() {
      rl.question('Pose app directory does not exist, would you like to create one now? [y / n] ', (answer) => {
         switch (answer) {
            case 'yes':
            case 'y':
               install();
               rl.close();
               break;
            case 'no':
            case 'n':
               console.log('Installation cancelled...aborting');
               pose.close();
               break;
            default:
               this.install();
               break;
         }
      });
   }.bind(this)());
};
