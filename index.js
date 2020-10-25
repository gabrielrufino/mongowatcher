#!/usr/bin/env node

'use strict'

const { MongoClient } = require('mongodb')
const { program } = require('commander')

const { version } = require('./package.json')

program
  .version(version)
  .option('--uri <uri>', 'MongoDB instance URI')
  .parse(process.argv)

async function main() {
  const client = new MongoClient(program.uri)

  await client.connect()
}

main()
