const express = require('express');
const database=require("../connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { VERSION_URL, LOGIN_URL } = require('../utils/ApplicationUrl');
const { USER_DB } = require('../utils/DbCollection');
const { LOGIN_FAIL_MESSAGE, USER_NOTFOUND_MESSAGE, SERVER_ERROR } = require('../utils/Message');

require('dotenv').config({ path: 'config.env' });
const JWT_SECRET=process.env.JWT_SECRET_KEY;


let loginRoutes = express.Router()


loginRoutes.post(`${VERSION_URL}${LOGIN_URL}`, async (req, res) => {
  try {
    let db = database.getDb();
    const { email, password } = req.body;

    const user = await db.collection(`${USER_DB}`).findOne({ email });
    if (!user) return res.status(400).json({ error: `${USER_NOTFOUND_MESSAGE}` });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: `${LOGIN_FAIL_MESSAGE}` });

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `${SERVER_ERROR}` });
  }
});


module.exports=loginRoutes