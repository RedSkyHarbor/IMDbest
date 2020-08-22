const { Validator } = require("node-input-validator");
const { registration, log_in } = require("../services/sessions");
const jwt = require("jsonwebtoken");

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
    // TODO send ALL errors not just the one that fails first
    res.status(422).send(validator.errors);
    return;
  }

  let result = {};
  try {
    let { username, password, email, is_admin } = await req.body;
    result.response = await registration(username, password, email, is_admin);
    if (result.response[0].id) {
      const token = jwt.sign(
        {
          id: result.response[0].id,
          is_admin: result.response[0].is_admin,
          username: result.response[0].username,
        },
        process.env.MOVIES_TOKEN_SECRET
      );
      res.header("auth-token", token);
    }
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
    // TODO send ALL errors not just the one that fails first
    res.status(422).send(validator.errors);
    return;
  }

  let result = {};
  try {
    const { username, password, is_admin } = await req.body;
    result.response = await log_in(username, password, is_admin);
    if (result.response.id) {
      const token = jwt.sign(
        {
          id: result.response.id,
          is_admin: result.response.is_admin,
          username: result.response.username,
        },
        process.env.MOVIES_TOKEN_SECRET
      );
      res.header("auth-token", token);
    }
  } catch (e) {
    result.response = false;
  } finally {
    res.header("content-type", "application/json");
    res.send(JSON.stringify(result));
  }
};

// TODO
const logout = async (req, res) => {
  res.status(200).send("Logged out.");
};

module.exports = {
  postRegistration,
  logout,
  login,
};
