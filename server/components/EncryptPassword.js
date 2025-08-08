const bcrypt = require("bcryptjs");

const encryptPassword = async (plainPassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (err) {
    console.error("Error hashing password:", err);
    throw err;
  }
};

module.exports = encryptPassword;
