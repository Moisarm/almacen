const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {createUser} = require('../controller/user/user')


const secretKey = "secret";
const ENV = require(`../config/envConfig`);
const { login, verifyToken } = require('../controller/Login/login');

router.post("/", async (req, res) => {
  try {

    const username = req.body.username;
    const password = req.body.password;

    console.log(username, password)



    let resp = await login(username, password)
      return res.status(resp.status).json(resp);
    // if (!username || !password) {
    //   return res.status(400).json({ message: "Username and password are required" });
    // }
    // if (username === "admin" && password === "123") {
    //   console.log(`COincide`)
    //   const token = jwt.sign({ username }, ENV.JWT_SECRET, { expiresIn: ENV.JWT_EXPIRES });
    //   return res.status(200).json({ token });
    // } else {
    //   return res.status(401).json({ message: "Authentication failed" });
    // }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.get("/protected", verifyToken, (req, res) => {
  return res.status(200).json({ message: "You have access" });
});


module.exports = router;
