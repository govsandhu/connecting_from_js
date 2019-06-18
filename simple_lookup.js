const pg = require("pg");
const settings = require("./settings"); 
var moment = require('moment');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


const queryType = process.argv.slice(2)[0];
let name = process.argv.slice(2)[0]; 

client.connect((err, cb) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching...');
});
  
  client.query('SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1', [name], (err,res) => {
    if (err) throw err;
          console.log(`Found ${res.rows.length} person(s) by the name ${name}':`)
          for (const person of res.rows) {
            console.log(`-${person.id}: ${person.first_name} ${person.last_name}, born '${moment(person.birthdate).format("YYYY-MM-DD")}'`)
          }
          client.end();
  });