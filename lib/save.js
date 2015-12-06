'use strict';

let usage = require('./usage'),
    rl = require('readline').createInterface(process.stdin, process.stdout);

module.exports = function(args) {
   if(args.length > 0) {
      if(args.length === 1) {
         let saveName = args[0];
         if(pose.saveExists(saveName)) {
            let ask = rl.question('Save ' + saveName + ' already exists, do you want to overwrite it? [y / n]', (answer) => {
               switch (answer) {
                  case 'yes':
                  case 'y':
                     
                     break;
                  case 'no':
                  case 'n':

                     break;
                  default:
                     ask();
                     break;
               }
            });
            ask();
         }
         console.log(saveName);
      }
      if(args.length >= 2) { // Check if the -u option is set
         if(args[1] === '-u' && args[2]) {
            console.log('hi');
         } else {
            console.log(usage.save);
            pose.close();
         }
      }
      // The -u option is not set

   } else {
      console.log(usage.save);
      pose.close();
   }
};
