import init from './init';
import help from './help';
import save from './save';
import list from './list';
import remove from './remove';

// aliases
const { i, s, rm, ls } = { init, save, remove, list };

export {
  init, i,
  save, s,
  list, ls,
  remove, rm,
  help,
};
