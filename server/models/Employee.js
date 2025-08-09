const mongoose = require('mongoose');
const { EMPLOYEE_DB } = require('../utils/DbCollection');
const { FIRST_NAME_REUIRED, FIRST_NAME_MIN, LAST_NAME_REUIRED, LAST_NAME_MIN, EMAIL_REUIRED, EMAIL_VALID, PHONE_REUIRED, PHONE_VALID, DOB_REUIRED, GENDER_REQUIRED } = require('../utils/Validation');
const { EMAIL_PATTERN, PHONE_PATTERN } = require('../utils/Pattern');
const { GENDER_ENUM } = require('../Enums/Gender');

const employeeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, `${FIRST_NAME_REUIRED}`],
      trim: true,
      minlength: [2, `${FIRST_NAME_MIN}`]
    },
    lastName: {
      type: String,
      required: [true, `${LAST_NAME_REUIRED}`],
      trim: true,
      minlength: [2, `${LAST_NAME_MIN}`]
    },
    email: {
      type: String,
      required: [true, `${EMAIL_REUIRED}`],
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, `${EMAIL_VALID}`]
    },
    phone: {
      type: String,
      required: [true, `${PHONE_REUIRED}`],
      trim: true,
      match: [PHONE_PATTERN, `${PHONE_VALID}`]
    },
    dob: {
      type: Date,
      required: [true, `${DOB_REUIRED}`]
    },
    gender: {
      type: String,
      enum: `${GENDER_ENUM}`,
      required: [true, `${GENDER_REQUIRED}`]
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(`${EMPLOYEE_DB}`, employeeSchema);
