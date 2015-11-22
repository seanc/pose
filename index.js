#!/usr/bin/env node
'use strict';

const lib = require('./lib'),
      user = lib.User,
      utils = lib.Utils,
      argv = process.argv.slice(2),
      command = lib.Command(argv),
      os = require('os'),
      fs = require('fs-extra'),
      rl = require('readline').createInterface(process.stdin, process.stdout),
      path = require('path');

if(argv.length === 0) {
   console.log(utils.getAppUsage());
   process.exit();
}

command.map('--save', '-s', (args) => {
   if(!user.appDirExists()) {
      let ask = function() {
         rl.question('Projector directory does not exist, would you like to create one? [y/n] ', (ans) => {
            if(ans === 'n') {
               console.log('Okay, exiting...');
               process.exit();
            }
            if(ans === 'y') {
               let createSaveDir = function(err) {
                  if(err) {
                     console.log(err);
                     return;
                  }
                  console.log('Projecter save directory created.');
                  process.exit();
               };
               fs.mkdir(path.join(os.homedir(), '.projector'), (err) => {
                  if(err) {
                     console.log(err);
                     return;
                  }
                  fs.mkdir(path.join(os.homedir(), '.projector', 'saves'), createSaveDir);
                  console.log('Projector application directory created, please run again.');
               });
            }
            if(ans !== 'y' && ans !== 'n') {
               console.log('Please enter y/n');
               ask();
            }
         });
      };
      ask();
      return;
   }
   if(args[0]) {
      let creator = function(deleteDir) {
         if(args[1] === '-cp') {
            if(args[2]) {
               let copyDir = args[2].trim();
               if(!fs.existsSync(copyDir)) {
                  console.log(copyDir + ' does not exist');
                  return;
               }
               if(!fs.lstatSync(copyDir).isDirectory()) {
                  console.log(copyDir + ' is not a directory');
                  return;
               }
               let copy = function(overwrite) {
                  try {
                     fs.copySync(copyDir, path.join(utils.getAppHome(), 'saves', args[0]));
                     if(overwrite === 'overwrite') {
                        console.log('Save ' + args[0] + ' was overwritten with ' + copyDir);
                     } else {
                        console.log('Save ' + args[0] + ' was created with ' + copyDir);
                     }
                     process.exit();
                  } catch (e) {
                     console.log(e);
                     process.exit();
                  }
               };
               if(deleteDir === 'delete') {
                  console.log('Overwriting...');
                  try {
                     fs.removeSync(path.join(utils.getAppHome(), 'saves', args[0]));
                     copy('overwrite');
                  } catch (e) {
                     console.log(e);
                  }
                  return;
               }
               copy();
            }
            return;
         }
         fs.mkdir(path.join(utils.getAppHome(), 'saves', args[0]), (err) => {
            if(err) {
               console.log('There was an error creating ' + args[0], err);
               process.exit();
            } else {
               console.log('Save ' + args[0] + ' was created');
               process.exit();
            }
         });
      };
      if(utils.saveExists(args[0])) {
         let save = args[0].trim(), ask;
         ask = function() {
            rl.question('Save ' + save + ' already exists, would you like to overwrite it? [y/n] ', (ans) => {
               if(ans === 'n') {
                  console.log('Okay, exiting...');
                  process.exit();
               }
               if(ans === 'y') {
                  creator('delete');
                  console.log('Save ' + save + ' has been overwritten');
                  process.exit();
               }
               if(ans !== 'y' && ans !== 'n') {
                  console.log('Please enter y/n');
                  ask();
               }
            });
         };
         ask();
         return;
      }
      creator();
   } else {
      console.log(utils.getAppUsage());
      process.exit();
   }
});

command.map('--list', '-l', () => {
   console.log('Boilerplate List - ');
   let dirList = fs.readdirSync(path.join(utils.getAppHome(), 'saves')).filter((file) => {
      return fs.statSync(path.join(utils.getAppHome(), 'saves', file)).isDirectory();
   });
   if(dirList.length === 0) {
      console.log('No boilerplates have been created');
      process.exit();
   }
   dirList.forEach((dir, index) => {
      index++;
      console.log('  ' + index + '. ' + dir);
   });
   process.exit();
});

command.map('--del', '-d', (args) => {
   if(args.length === 1) {
      if(!fs.existsSync(path.join(utils.getAppHome(), 'saves', args[0]))) {
         console.log(args[0] + ' save does not exist');
         process.exit();
      }
      fs.remove(path.join(utils.getAppHome(), 'saves', args[0]), (err) => {
         if(err) {
            console.log(err);
            process.exit();
         }
         console.log('Save %s was deleted', args[0]);
         process.exit();
      });
      return;
   }
   if(args.length > 1) {
      let worked = args.length;
      for(let i = 0; i < args.length; i++) {
         if(!fs.existsSync(path.join(utils.getAppHome(), 'saves', args[i]))) {
            console.log(args[i] + ' save does not exist');
            process.exit();
         }
         try {
            fs.removeSync(path.join(utils.getAppHome(), 'saves', args[i]));
         } catch (e) {
            console.log('There was an error deleting save ' + args[i]);
            worked--;
         }
      }
      if(worked > 0) {
         console.log('Saves were deleted');
         process.exit();
      } else {
         console.log('Command failed');
         process.exit();
      }
      return;
   }
});

command.map('--put', '-p', (args) => {
   let save = args[0];
   if(!utils.saveExists(save)) {
      console.log('Save ' + save + ' does not exist');
      process.exit();
   }
   if(args[1] === '-us') {
      let oldSave = args[2];
      if(!utils.saveExists(oldSave)) {
         console.log('Old save ' + oldSave + ' does not exist');
         process.exit();
      }
      try {
         fs.removeSync(path.join(utils.getAppHome(), 'saves', save));
      } catch (e) {
         console.log(e);
         process.exit();
      }
      fs.copy(path.join(utils.getAppHome(), 'saves', oldSave), path.join(utils.getAppHome(), 'saves', save), (err) => {
         if(err) {
            console.log(err);
            process.exit();
         }
         console.log('Save ' + save + ' now using save ' + oldSave);
         process.exit();
      });
   }
   if(args[1] === '-u' || args[1] === '--use') {
      let copyDir = args[2];
      if(!fs.existsSync(copyDir)) {
         console.log('Directory ' + copyDir + ' does not exist');
         process.exit();
      }
      try {
         fs.removeSync(path.join(utils.getAppHome(), 'saves', save));
      } catch (e) {
         console.log(e);
         process.exit();
      }
      fs.copy(copyDir, path.join(utils.getAppHome(), 'saves', save), (err) => {
         if(err) {
            console.log(err);
            process.exit();
         }
         console.log('Save ' + save + ' now using ' + copyDir);
         process.exit();
      });
   }
});

command.map('--create', '-c', (args) => {
   //pro -c project-name -w save
   let save = args[2];
   let project = args[0];
   if(args[1] === '-w' || args[1] === '--with') {
      if(!utils.saveExists(save)) {
         console.log('Save ' + save + ' does not exist');
         process.exit();
      }
      fs.copy(path.join(utils.getAppHome(), 'saves', save), project, (err) => {
         if(err) {
            console.log(err);
            process.exit();
         }
         console.log('Project ' + project + ' created, have fun!');
         process.exit();
      });
   } else {
      console.log(utils.getAppUsage());
      process.exit();
   }
});

command.map('--help', '-h', () => {
   console.log(utils.getAppUsage());
   process.exit();
});

command.map('--version', '-v', () => {
   console.log('Projector Version 1.0.0');
   process.exit();
});
