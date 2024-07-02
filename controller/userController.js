const User = require("../model/user.js");
const Cars = require("../model/user.js");
const Car1 = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = {};

// userController.createcar = async (req, res) => {
//   const { category, model, number_plate, current_city, rent_per_hr } = req.body;

//   Cars.create(
//     {
//       category,
//       model,
//       number_plate,
//       current_city,
//       rent_per_hr,
//     },
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.status(201).json({ message: "Car added successfully" });
//     }
//   );
// };

userController.createcar = async (req, res) => {
  const { category, model, number_plate } = req.body;
  User.create({ category, model, number_plate }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "car Successfully added" });
  });
};

userController.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({ username, email, password: hashedPassword }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Account Successfully Created" });
  });
};

userController.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  });
};

userController.getUser = (req, res) => {
  const userId = req.user.id;
  User.findById(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(results[0]);
  });
};

userController.updateUser = (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;
  User.update(userId, { username, email }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User updated successfully!" });
  });
};

userController.deleteUser = (req, res) => {
  const userId = req.user.id;
  User.delete(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "User deleted successfully!" });
  });
};
module.exports = userController;
