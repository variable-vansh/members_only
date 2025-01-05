#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  fristname VARCHAR ( 255 ),
  lastname VARCHAR ( 255 ),
  membershipstatus VARCHAR ( 255 ),
  admin VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 ),
  time VARCHAR ( 255 )
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://members_only_db_0iba_user:XVHZECJMEu7PgG6lyQ8KvwpLXOrtMqX5@dpg-cttarjjqf0us73eqjuk0-a.singapore-postgres.render.com/members_only_db_0iba?ssl=true",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
