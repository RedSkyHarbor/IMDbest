const { Validator } = require("node-input-validator");
const { registration, log_in } = require("../services/sessions");

// TODO force usernames to be lowercase on account creation and log in

const postRegistration = async (req, res) => {
  const validator = new Validator(req.body, {
    username: "required|string|minLength:3|maxLength:31",
    password: "required|string|minLength:5|maxLength:256",
    email: "required|email|maxLength:64",
    is_admin: "required|boolean",
  });

  const matched = await validator.check();

  if (!matched) {
    res.status(422).send(validator.errors);
    return;
  }

  let result = {};
  try {
    let { username, password, email, is_admin } = await req.body;
    result.response = await registration(username, password, email, is_admin);
  } catch (e) {
    result.response = false;
  } finally {
    res.header("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
};

const login = async (req, res) => {
  const validator = new Validator(req.body, {
    username: "required|string|minLength:3|maxLength:31",
    password: "required|string|minLength:5|maxLength:256",
    is_admin: "required|boolean",
  });

  const matched = await validator.check();

  if (!matched) {
    res.status(422).send(validator.errors);
    return;
  }

  let result = {};
  try {
    const { username, password, is_admin } = await req.body;
    result.response = await log_in(username, password, is_admin);
    if (result.response) {
      // TODO secure cookie https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely
      const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      res.cookie("logged_in", "1", { expires: expiryDate });
    }
  } catch (e) {
    result.response = false;
  } finally {
    res.header("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
};

// TODO research if this is secure
const logout = async (req, res) => {
  res.clearCookie("logged_in");
  res.status(200).send("Logged out.");
};

module.exports = {
  postRegistration,
  logout,
  login,
};
