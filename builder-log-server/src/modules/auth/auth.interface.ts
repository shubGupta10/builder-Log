import { Types, Document } from "mongoose";

export interface GithubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface IGithubAuth extends Document {
    userId: Types.ObjectId;
    accessToken: string;
    scope?: string;
    createdAt: Date;
    updatedAt: Date;
}
