import { Command } from 'commander';
import { createRequire } from 'module';
import { init } from './commands/init';
import { add } from './commands/add';
import { list } from './commands/list';
import { update } from './commands/update';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json');

export function createCLI() {
  const program = new Command()
    .name('asds')
    .description(packageJson.description)
    .version(packageJson.version, '-v, --version', 'Display version number');

  // Register commands
  program.addCommand(init);
  program.addCommand(add);
  program.addCommand(update);
  program.addCommand(list);

  return program;
}
