import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['senior', 'volunteer', 'admin'],
    required: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
  },
  volunteerProfile: {
    skills: [String],
    availability: [{
      day: String,
      timeSlots: [String],
    }],
    preferences: [String],
    experience: String,
  },
  seniorProfile: {
    dateOfBirth: Date,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    medicalConditions: [String],
    interests: [String],
    serviceNeeds: [String],
  },
  trialPeriod: {
    isActive: {
      type: Boolean,
      default: false,
    },
    startDate: Date,
    endDate: Date,
  },
  subscription: {
    type: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free',
    },
    startDate: Date,
    endDate: Date,
  },
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);