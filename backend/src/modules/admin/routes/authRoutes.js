const router = require("express").Router();

// Changed from "../controllers/auth.controller" to "../controllers/authController"
const { register, login } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", register);

router.post("/login", login);

module.exports = router;
