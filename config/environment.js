const dotenv = require('dotenv');

dotenv.config();

const { JWT_SECRET } = process.env;

module.exports = {
  jwtSecret: JWT_SECRET,

};
