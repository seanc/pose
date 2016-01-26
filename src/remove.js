import fs from 'fs';
import path from 'path';

/** pose.remove
 * @desc Remove a template
 * @param {Object} opts - Options.
 */
function remove(opts = {}) {
  const name = opts.name || path.basename(process.cwd());
  const template = path.join(opts._templates, `${name}.tar`);

  process.stdout.write(`Are you sure you want to remove ${name} [y/N]? `);

  process.stdin.resume();
  process.stdin.on('data', rawInput => {
    const input = rawInput.toString().trim().toLowerCase();

    if (input === 'y' || input === 'yes') {
      fs.unlink(template, err => {
        if (!err) {
          console.log(`Removed ${name}.`);
        } else {
          console.error(`Failed to remove ${name}.`);
        }
        process.stdin.pause();
      });
    } else if (input === 'n' || input === 'no' || !input) {
      console.error('Aborting.');
      process.stdin.pause();
    } else {
      console.error(`Invalid input ${input}.  Aborting.`);
      process.stdin.pause();
    }
  });
}

export default remove;
