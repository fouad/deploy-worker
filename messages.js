const chalk = require('chalk')
const program = { name: 'deploy-worker' }

exports.help = function() {
  return `
    Only ${chalk.green('<project-directory>')} is required.
    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/fouad/deploy-worker/issues/new')}
  `
}

exports.skipBuildHelp = function() {
  return `skip the ${chalk.cyan('webpack')} build step and only deploy`
}

exports.zoneHelp = function() {
  return `your Cloudflare Zone ID ${chalk.bold('$CF_ZONE_ID')}`
}

exports.accountHelp = function() {
  return `your Cloudflare Account ID ${chalk.bold('$CF_ACCOUNT_ID')}`
}

exports.helpMissingFilePath = function() {
  return `
${chalk.red('Error!')} Missing worker script path

For example:
  ${chalk.cyan(program.name)} ${chalk.green('hello.js')}
  ${chalk.cyan(program.name)} ${chalk.cyan('--zone-id')} ${chalk.bold(
    '$PRODUCTION_CF_ZONE_ID'
  )} ${chalk.green('worker.js')}

Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`
}

let paramLookup = {
  email: `your Cloudflare login email ${chalk.bold('$CF_EMAIL')}`,
  authKey: `your Cloudflare account authentication key ${chalk.bold(
    '$CF_AUTH_KEY'
  )}`,
  zoneId: this.zoneHelp(),
  accountId: this.accountHelp()
}

exports.helpMissingParams = function(params) {
  return `
${chalk.red('Error!')} Missing Cloudflare option${params.length > 1 ? 's' : ''}:

${params
  .map(param => `- ${chalk.bold(param)} ${paramLookup[param]}`)
  .join('\n')}

Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`
}
