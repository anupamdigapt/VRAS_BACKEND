const bcrypt = require("bcrypt");
const User = require("../../model/userModel");

class userController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = await User.create(username, hashedPassword);
      res.status(201).json({ userId });
    } catch (err) {
      throw err;
    }
  }
}
module.exports = new userController();
