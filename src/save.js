import fs from 'fs';
import path from 'path';
import { Reader } from 'fstream';
import { Pack } from 'tar';

/** pose.save
 * @desc Save a template.
 * @param {Object} opts - Options.
 */
function save(opts = {}) {
  const context = opts.context || process.cwd();
  const name = opts.name || path.basename(context);
  const template = path.join(opts._templates, `${name}.tar`);

  const dest = fs.createWriteStream(template);
  const pack = new Pack({ noProprietary: true });
  const read = new Reader({ path: path.resolve(context), type: 'Directory' })
  .pipe(pack)
  .pipe(dest);

  pack.on('end', () => {
    console.log(`Saved ${context} as ${name}.`);
  });

  pack.on('error', () => {
    console.log(`Failed to pack ${template}`);
  });

  read.on('error', () => {
    console.log(`Failed to read ${context}.`);
  });
}

export default save;
