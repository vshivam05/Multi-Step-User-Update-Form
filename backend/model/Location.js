import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

export default mongoose.model('Location', locationSchema);