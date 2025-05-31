import { model, Schema, Types } from "mongoose";
import { Recommendation, RecommendationSchema } from "./recommendation.model";


export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  favorites: Types.ObjectId[];
  recommendationsReceived: Recommendation[];
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  passwordHash: { 
    type: String, 
    required: true,
    minlength: 6
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.passwordHash;
      return ret;
    }
  }
});

export const UserModel=model<IUser>('User',UserSchema)