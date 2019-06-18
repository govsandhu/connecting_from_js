const pg = require("pg");
const settings = require("./settings"); 
var moment = require('moment');

const knex = require('knex')({
    client: 'pg',
    connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
    }
});

const name = process.argv.slice(2)[0];

knex
  .select('*')
  .from('famous_people')
  .where('first_name', name)
  .orWhere('last_name', name)
  .asCallback(function(err,rows) {
    if (err) return console.error(err);
    console.log('Searching...')
    console.log(`Found ${rows.length} person(s) by the name ${name}:`)
    for (const person of rows) {
      console.log(`-${person.id}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format("YYYY-MM-DD")}'`)
    }
  })

