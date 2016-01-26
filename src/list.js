import fs from 'fs';

/** pose.list
 * @desc List saved templates
 * @param {Object} opts - Options.
 * @alias rm
 */
function list(opts = {}) {
  fs.readdir(opts._templates, (err, files) => {
    if (!err) {
      const tarExt = /\.tar$/i;
      const templates = files.map(file => file.replace(tarExt, ''));
      console.log(templates.join(', '));
    } else {
      console.error('Failed fetching templates directory.');
    }
  });
}

export default list;
