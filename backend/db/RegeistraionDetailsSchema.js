const mongoose = require('mongoose');
const bcrypt=require("bcrypt");
const requirementsSchema = new mongoose.Schema({
  purpose: String,
  amount: String,
});

const animalsSchema = new mongoose.Schema({
  name: String,
  count: Number,
});



const BankDetails=new mongoose.Schema({
  bankName:{type:String,
    default:"Bank of India"
  },
  IFSCCode:{type:String,
    default:"SBIN000555"
  },
  accountNo:{
    type:String,
    default:"34797633568"
  },
  namePerBank:{type:String,
    default:"34797633568"}

})
const facilitiesSchema = new mongoose.Schema({
  name: String,
});

const imageSchema = new mongoose.Schema({
  imageUrl: String,
});
const registrationDetailsSchema = new mongoose.Schema({
  goshalaName: {
    type: String,
    required: true,
  },
  establishmentDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Clear the time part
        return value < today; // Only accept dates before today
      },
      message: props => `${props.value} is not a valid date. Establishment date cannot be today or in the future.`,
    },
  },
  about: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  registrationNo: {
    type: String,
    required: true,
  },
  landType: {
    type: String,
    required: true,
  },
  landArea: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  BankDetails:BankDetails,
  requirements: [requirementsSchema],
  animals: [animalsSchema],
  facilities: [facilitiesSchema],
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid mobile number!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(v);
      },
      message: props => 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
    },
  },
  
  images: [imageSchema],
  role: {
    type: String,
    default: 'goshalas',
  },
});


registrationDetailsSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('RegistrationDetails', registrationDetailsSchema);
