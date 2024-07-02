const db = require("../config/db");
const User = {};
const Cars = {};
const Car1 = {};

Cars.create = (cars, callback) => {
  const query =
    "INSERT INTO cars(category, model, number_plate, current_city, rent_per_hr) VALUES ( ?, ? ,? ,? ,?) ";
  db.query(
    query,
    [
      cars.category,
      cars.model,
      cars.number_plate,
      cars.current_city,
      cars.rent_per_hr,
    ],
    callback
  );
};

Car1.create = (car1, callback) => {
  const query =
    "INSERT INTO car1 (category, model, number_plate) VALUES (?, ?, ?)";
  db.query(query, [car1.category, car1.model, car1.number_plate], callback);
};

User.create = (user, callback) => {
  const query =
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.query(query, [user.username, user.email, user.password], callback);
};

User.findById = (id, callback) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], callback);
};
User.findByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};
User.update = (id, user, callback) => {
  const query = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  db.query(query, [user.username, user.email, id], callback);
};
User.delete = (id, callback) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], callback);
};
module.exports = User;
