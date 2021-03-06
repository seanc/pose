#!/usr/bin/env node

import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import * as pose from '.';
import actions from './actions';

const opts = yargs
.usage('$ pose <action> [options]')
.help('help')
.epilog(actions.trim())
.options({
  name: {
    alias: ['n'],
    desc: 'Name of template',
  },

  context: {
    alias: ['c'],
    desc: 'Entry of template',
  },

  help: {
    alias: ['h'],
  },
}).argv;
const action = opts._[0];

if (!action) {
  console.error('Type "pose help" to get started.');
  process.exit();
}

[
  opts._pose = path.join(process.env.HOME, '.pose'),
  opts._templates = path.join(opts._pose, 'templates'),
].forEach(dir => {
  fs.mkdir(dir, () => null);
});

if (typeof pose[action] === 'function') {
  pose[action](opts);
} else {
  console.error(`Unknown action "${action}"`);
}
export { action, opts };
