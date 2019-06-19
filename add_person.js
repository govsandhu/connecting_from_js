const settings = require("./settings"); 

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

const firstName = process.argv.slice(2)[0];
const lastName = process.argv.slice(2)[1];
const dob = process.argv.slice(2)[2];

let myObj = {};
myObj.first_name = firstName;
myObj.last_name = lastName;
myObj.birthdate = dob;

console.log(myObj);

knex('famous_people')
  .insert(myObj)
  .asCallback(function (err, result) {
    console.log(result);
  })