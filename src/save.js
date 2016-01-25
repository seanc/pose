import fs from 'fs';
import path from 'path';
import { Reader } from 'fstream';
import { Pack } from 'tar';

/** pose.save
 * @desc Save a template.
 * @param {Object} opts - Options.
 */
function save(opts = {}) {
  const name = opts._[2] || opts.name;
  const entry = opts._[1] || opts.entry;
  const destPath = path.join(opts._templates, `${name}.tar`);

  const dest = fs.createWriteStream(destPath);
  const pack = new Pack({ noProprietary: true });
  const read = new Reader({ path: entry, type: 'Directory' })
  .pipe(pack)
  .pipe(dest);

  pack.on('end', () => {
    console.log(`Saved ${entry} as ${name}.`);
  });

  pack.on('error', () => {
    console.log(`Failed to pack ${destPath}`);
  });

  read.on('error', () => {
    console.log(`Failed to read ${entry}.`);
  });
}

export default save;
