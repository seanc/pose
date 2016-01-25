import fs from 'fs';
import path from 'path';
import { Reader } from 'fstream';
import { Pack } from 'tar';

/** pose.save
 * @desc Save a template.
 * @param {Object} opts - Options.
 */
function save(opts = {}) {
  const name = opts._[1] || opts.name;

  const destPath = path.join(opts._templates, `${name}.tar`);
  const dest = fs.createWriteStream(destPath);

  const pack = new Pack({ noProprietary: true });

  const read = new Reader({ path: opts.entry, type: 'Directory' })
  .pipe(pack)
  .pipe(dest);

  pack.on('end', () => {
    console.log(`Saved ${name}.`);
  });

  pack.on('error', () => {
    console.log(`Failed to pack ${destPath}`);
  });

  read.on('error', () => {
    console.log(`Failed to read ${opts.entry}.`);
  });
}

export default save;
