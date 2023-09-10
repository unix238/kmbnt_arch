import mongoose from 'mongoose';

const generateActivationCode = () => {
  const chars = '0123456789';
  const length = chars.length;
  let activationCode = '';
  for (let i = 0; i < 4; i++) {
    activationCode += chars[Math.floor(Math.random() * length)];
  }
  return activationCode;
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  newsRecipient: { type: Boolean, default: false },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isActivated: { type: Boolean, default: false },
  activationCode: { type: String, default: generateActivationCode() },
  connectionType: { type: String, default: 'local' },
  deliveryData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryData',
    required: false,
  },
});

export default mongoose.model('User', userSchema);
