#!/usr/bin/env node

import yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import * as pose from '.';

const opts = yargs
.usage('$ pose <action> [options]')
.help('help')
.options({
  name: {
    alias: ['n'],
    default: path.basename(process.cwd()),
    desc: 'Name of template',
  },

  entry: {
    alias: ['e'],
    default: process.cwd(),
    defaultDesc: 'cwd',
    desc: 'Entry of template',
  },

  help: {
    alias: ['h'],
  },
}).argv;
const action = opts._[0];

[
  opts._pose = path.join(process.env.HOME, '.pose'),
  opts._templates = path.join(opts._pose, 'templates'),
].forEach(dir => {
  fs.mkdir(dir, () => null);
});

pose[action](opts);
export { action, opts };
