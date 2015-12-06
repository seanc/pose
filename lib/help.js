'use strict';

let info = {
   'pose save <name> [-u <dir>]': 'Create a save optinally using a directory',
   'post delete <name>': 'Delete a save permanently',
   'pose update <name> [-u <dir|save>] [-n <new-name>]': 'Update a save optionally with a new directory and/or name',
   'pose create <name> -u <save>': 'Create a new project with using an existing save',
   'post list-saves': 'List saves',
   'post help': 'Brings up this page'
};

module.exports = function() {
   let description;
   for (let usage in info) {
      description = info[usage];
      console.log('')
         .set('[31m')
         .log(usage).set('[0m')
         .log(description)
      .log('');
   }
   pose.close();
};
