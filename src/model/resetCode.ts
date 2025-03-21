import mongoose, { Model, Schema } from "mongoose";

interface ResetCodeInterface extends Document {
  email: string;
  code: string;
  expiresAt: Date;
}

const resetCodeSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000),
    expires: 600,
  },
});

const ResetCode:Model<ResetCodeInterface>= mongoose.model<ResetCodeInterface>("ResetCode", resetCodeSchema);
export default ResetCode