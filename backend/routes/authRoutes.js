const router = require("express").Router();

const { register, login } = require("../controllers/auth.controller");

const validator = require("../middlewares/validator");

router.post("/register", validator, register);

router.post("/login", validator, login);

module.exports = router;