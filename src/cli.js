#!/usr/bin/env node

import yargs from 'yargs';
import path from 'path';
import pose from '.';

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

pose[action](opts);

export { action, opts };
