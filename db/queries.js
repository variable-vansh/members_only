const pool = require("./pool");

async function getAllMessagesMember() {
  const results = await pool.query(
    "SELECT username, message, time, id FROM messages ORDER by id"
  );
  const messages = results.rows.map((row) => ({
    username: row.username,
    message: row.message,
    time: row.time,
    id: row.id,
  }));
  return messages;
}

async function deleteMessageById(id) {
  await pool.query("DELETE FROM messages WHERE id=$1", [id]);
}

module.exports = {
  getAllMessagesMember,
  deleteMessageById,
};
