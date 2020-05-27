import { createCommand } from 'commander'

import commands from './commands'

/**
 * setup command
 */
const setup = () => {
  const program = createCommand()

  program.version('0.0.1')

  program.exitOverride()

  program.command('run <code>').action((code: string) => {
    commands.run(code)
  })

  program.parse(process.argv)
}

setup()
