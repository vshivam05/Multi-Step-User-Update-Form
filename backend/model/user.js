const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  profilePhoto: {
    type: String
    
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxlength: 20,
    validate: {
      validator: function(v) {
        return !/\s/.test(v);
      },
      message: 'Username cannot contain spaces'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  customGender: {
    type: String,
    required: function() {
      return this.gender === 'Other';
    }
  },
  profession: {
    type: String,
    enum: ['Student', 'Developer', 'Entrepreneur'],
    required: true
  },
  companyName: {
    type: String,
    required: function() {
      return this.profession === 'Entrepreneur';
    }
  },
  address: {
    line1: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
  },
  subscriptionPlan: {
    type: String,
    enum: ['Basic', 'Pro', 'Enterprise'],
    required: true
  },
  newsletter: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User= mongoose.model('User', userSchema);

module.exports = {User};