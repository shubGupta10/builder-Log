import { User } from "./user.model.js"

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select(
        "githubId githubUsername githubAvatarUrl githubProfileUrl displayName bio isBuilderProfile builderSlug onboardingDone lastLoginAt lastSyncedAt"
    )

    if(!user){
        throw new Error("User not found");
    }

    return user;
}

export const userService = {
    getMe,
}