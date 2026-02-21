export interface IUser extends Document {
  githubId: string;
  githubUsername: string;
  githubAvatarUrl?: string;
  githubProfileUrl?: string;

  displayName?: string;
  bio?: string;
  isBuilderProfile: boolean;
  builderSlug?: string;

  onboardingDone: boolean;
  lastLoginAt?: Date;
  lastSyncedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}