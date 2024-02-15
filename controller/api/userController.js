const User = require("../../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret } = require("../../config/environment");
const userValidator = require("../../validationSchema/user");

class userController {
  // Method Register
  async register(req, res) {
    try {
      const { error } = userValidator.registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const saveData = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      if (saveData && saveData.id) {
        return res.json({ message: "Registered successfully", saveData });
      } else {
        res.json({ status: 200, message: "Registration failed" });
      }
    } catch (error) {
      res.status(300).json({
        code: 300,
        message: error.message,
        data: null,
      });
    }
  }
  //  Method Login

  async login(req, res) {
    try {
      const { error } = userValidator.loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid email" });
      }

      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });

      res
        .header("Authorization", `${token}`)
        .json({ message: "Login successful", token });
    } catch (error) {
      res.status(300).json({
        code: 300,
        message: error.message,
        data: null,
      });
    }
  }
}
module.exports = new userController();
