import fs from 'fs';
import path from 'path';
import { Extract } from 'tar';

/** pose.init
 * @desc Initiate a template.
 * @param {Object} opts - Options
 */
function init(opts = {}) {
  const name = opts.name || path.basename(process.cwd());
  const context = opts.context || path.join(process.cwd(), name);

  const template = path.join(opts._templates, `${name}.tar`);

  const extract = new Extract({ path: context });
  const write = fs.createReadStream(path.resolve(template))
  .pipe(extract);

  extract.on('end', () => {
    console.log(`Initiated ${name} as ${context}.`);
  });

  extract.on('error', () => {
    console.log(`Failed to extract ${name}`);
  });

  write.on('error', () => {
    console.log(`Failed to write ${context}`);
  });
}

export default init;
