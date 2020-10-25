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

  const db = client.db()

  const collections = await db
    .listCollections()

  collections.each((error, collection) => {
    if (!error && collection) {
      db
        .collection(collection.name)
        .watch()
        .on('change', next => {
          console.log(next)
        })
    }
  })
}

main()
