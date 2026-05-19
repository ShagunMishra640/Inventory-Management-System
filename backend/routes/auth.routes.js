const router = require("express").Router();

const { register, login } = require("../controllers/auth.controller");

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

router.post("/register", register);

router.post("/login", login);

module.exports = router;