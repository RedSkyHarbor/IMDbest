const express = require("express");
const { postRegistration, login, logout } = require("../controllers/sessions");
const router = express.Router();

router.post("/registration", postRegistration);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
