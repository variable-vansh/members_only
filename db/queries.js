const pool = require("./pool");

async function getAllMessagesMember(){
  const results = await pool.query("SELECT username, message, time FROM messages ORDER by id");
  const messages = results.rows.map((row) => ({
    username:row.username,
    message:row.message, 
    time:row.time
  }));
  return messages;
}

module.exports={
    getAllMessagesMember
}