import mongoose from 'mongoose';

const configSchema = new mongoose.Schema(
  {
    cambioDia: { type: Number, default: 0, required: false },
  },
  {
    timestamps: true,
  }
);
const Config = mongoose.model('Config', configSchema);
export default Config;
