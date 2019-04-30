#! /usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const package = require('./package.json')
const messages = require('./messages')
const { error } = require('./stdout')
const deploy = require('./deploy')
const build = require('./build')

let filePath

program
  .version(package.version)
  .arguments('<script-path>')
  .usage(`${chalk.green('<script-path>')} [options]`)
  .action(function(file) {
    filePath = path.resolve(process.cwd(), file)
  })
  .option('-s, --skip-build', messages.skipBuildHelp())
  .option('--zone-id <cloudflare-zone-id>', messages.zoneHelp())
  .option('--account-id <cloudflare-account-id>', messages.accountHelp())
  .allowUnknownOption()
  .on('--help', messages.help)
  .parse(process.argv)

if (!filePath) {
  console.error(messages.helpMissingFilePath())
  process.exit(1)
}

let email = process.env.CF_EMAIL || process.env.CLOUDFLARE_EMAIL
let authKey = process.env.CF_AUTH_KEY || process.env.CLOUDFLARE_AUTH_KEY
let zoneId =
  program.zoneId || process.env.CF_ZONE_ID || process.env.CLOUDFLARE_ZONE_ID
let accountId =
  program.accountId ||
  process.env.CF_ACCOUNT_ID ||
  process.env.CLOUDFLARE_ACCOUNT_ID

let deployInput = {
  email,
  zoneId,
  authKey,
  accountId // optional
}

let missingParams = Object.keys(deployInput).filter(
  param => param !== 'accountId' && !deployInput[param]
)

if (missingParams.length > 0) {
  console.error(messages.helpMissingParams(missingParams))
  process.exit(1)
}

let info = [
  `${chalk.bold('Zone')}: ${zoneId}`,
  accountId && `${chalk.bold('Account')}: ${accountId}\n`,
  `${chalk.bold('File')}: ${filePath}`
]
  .filter(Boolean)
  .map(s => '  ' + s)
  .join('\n')

console.log(`
  🌤 ${chalk.bold('deploy-worker')}

${info}
`)

if (program.skipBuild) {
  deploy({ ...deployInput, filePath })
} else {
  build({ filePath })
    .catch(err => {
      error(err)
      process.exit(1)
    })
    .then(({ code }) => {
      deploy({ ...deployInput, code })
    })
}
