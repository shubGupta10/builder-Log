import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.interface.js";

const UserSchema = new Schema<IUser>(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    githubUsername: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    githubAvatarUrl: {
      type: String,
    },
    githubProfileUrl: {
      type: String,
    },

    displayName: {
      type: String,
    },
    bio: {
      type: String,
    },
    isBuilderProfile: {
      type: Boolean,
      default: false,
    },
    builderSlug: {
      type: String,
      unique: true,
      sparse: true,
    },

    onboardingDone: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },
    lastSyncedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
