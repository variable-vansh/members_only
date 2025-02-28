#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  password VARCHAR ( 255 ),
  firstname VARCHAR ( 255 ),
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
      "postgresql://members_only_psql_user:0U7ZnCKfQWiFEZihsHYQ14XwN63GXc8G@dpg-cv0rq9i3esus73aq5430-a.singapore-postgres.render.com/members_only_psql?ssl=true",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
