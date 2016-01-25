import fs from 'fs';
import path from 'path';
import { Extract } from 'tar';

/** pose.init
 * @desc Initiate a template.
 * @param {Object} opts - Options
 */
function init(opts = {}) {
  const name = opts.name;
  const templateName = opts._[1];
  const entry = path.join(opts._[2] || opts.entry, name);
  const template = path.join(opts._templates, `${templateName}.tar`);

  const extract = new Extract({ path: entry });
  const write = fs.createReadStream(template)
  .pipe(extract);

  extract.on('end', () => {
    console.log(`Initiated ${name}.`);
  });

  extract.on('error', () => {
    console.log(`Failed to extract ${templateName}`);
  });

  write.on('error', () => {
    console.log(`Failed to write ${template}`);
  });
}

export default init;
