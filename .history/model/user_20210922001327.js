const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        required:[true,'Enter your valid email']
    },
    phone:{
        type:Number,
        required:[true,'Enter your valid Phone Number ']
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false, // it will not return the password when querying
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
});
UserSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  //Match user entered password to hashed password in database
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return  bcrypt.compare(enteredPassword, this.password); 
  };
  
  
  //Generate and hash password token
  UserSchema.methods.getResetPasswordToken = function () {
    //Generate the token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    //set expire time to 10 minutes
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
  
  module.exports = mongoose.model("User", UserSchema);