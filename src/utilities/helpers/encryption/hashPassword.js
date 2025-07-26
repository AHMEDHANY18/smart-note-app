const crypto = require('crypto');
module.exports = async (password) => {
  return crypto.pbkdf2Sync(password, process.env.HASH_KEY, 10000, 64, 'sha512').toString('hex');
}

