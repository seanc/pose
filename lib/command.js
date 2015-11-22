'use strict';

const Command = function(argv) {
   this.argv = argv;
};

Command.prototype.map = function(label, shorthand, callback) {
   let command = (this.argv.indexOf(label) === -1) ? this.argv.indexOf(shorthand) : this.argv.indexOf(label);
   if(command !== -1) {
      callback(this.argv.slice(1));
   }
   return new Command();
};

Command.prototype.close = function() {
   process.exit();
};

module.exports = function(argv) {
   return new Command(argv);
};
