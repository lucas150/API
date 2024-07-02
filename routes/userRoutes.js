const express = require("express");
const router = express.Router();
const userController = require("../controller/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/car/create", userController.createcar);

router.get("/profile", authMiddleware, userController.getUser);
router.put("/profile", authMiddleware, userController.updateUser);
router.delete("/profile", authMiddleware, userController.deleteUser);
module.exports = router;
