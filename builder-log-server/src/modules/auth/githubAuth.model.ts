import "../../config/env.js";
import { Schema, model } from "mongoose";
import { IGithubAuth } from "./auth.interface.js";
import { decrypt, encrypt } from "../../utils/encryption.js";

const GithubAuthSchema = new Schema<IGithubAuth>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        accessToken: {
            type: String,
            required: true,
            get: decrypt, 
            set: encrypt  
        },
        scope: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

GithubAuthSchema.set("toJSON", { getters: true });
GithubAuthSchema.set("toObject", { getters: true });

export const GithubAuth = model<IGithubAuth>(
    "GithubAuth",
    GithubAuthSchema
);
