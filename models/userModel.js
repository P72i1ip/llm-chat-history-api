import crypto from 'crypto';
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [
      40,
      'A user name must have less or equal than 40 characters',
    ],
    minlength: [
      3,
      'A user name must have more or equal than 3 characters',
    ],
    validate: {
      // custom validator
      validator: function (val) {
        return validator.isAlpha(val, 'en-US', {
          ignore: ' ',
        }); // only letters and spaces
      },
      message: 'User name must only contain characters',
    },
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true, // convert to lowercase
    validate: [
      validator.isEmail,
      'Please provide a valid email',
    ], // built-in validator
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [
      8,
      'A password must have more or equal than 8 characters',
    ],
    select: false, // do not return password in queries
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // custom validator for password confirmation
      validator: function (val) {
        return val === this.password; // this only works on CREATE and SAVE not UPDATE
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Middleware to hash password before saving user
userSchema.pre('save', async function (next) {
  // only run this function if password was modified
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

// Middleware to set passwordChangedAt field
userSchema.pre('save', function (next) {
  // only run this function if password was modified
  if (!this.isModified('password') || this.isNew)
    return next();

  // set passwordChangedAt to current time
  this.passwordChangedAt = Date.now() - 1000; // subtract 1 second to ensure JWT is not issued before password change

  next();
});

// Middleware to filter out inactive users, for all queries starting with 'find'
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// Method to check if password is correct
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(
    candidatePassword,
    userPassword
  );
};

userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp
) {
  if (this.passwordChangedAt) {
    // console.log(this.passwordChangedAt, JWTTimestamp);
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // convert to seconds
    return JWTTimestamp < changedTimestamp; // if JWT was issued before password change
  }

  // false means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // create random token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // hash the token and set it to passwordResetToken field
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  // set passwordResetExpires to 10 minutes in the future
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken; // return the plain token for sending to user
};

export const User = mongoose.model('User', userSchema);
