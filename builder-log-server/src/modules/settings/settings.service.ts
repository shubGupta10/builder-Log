import redis from "../../lib/redis.js";
import { GithubAuth } from "../auth/githubAuth.model.js"
import { User } from "../user/user.model.js";

const getGithubStatus = async (userId: string) => {
    const findUser = await GithubAuth.findOne({ userId }).populate('userId');
    if (!findUser) {
        return {
            connected: false,
            message: "User not connected"
        }
    }

    const user = findUser.userId as any;

    return {
        connected: true,
        message: "User connected",
        githubUsername: user?.githubUsername,
        githubAvatarUrl: user?.githubAvatarUrl,
        connectedSince: findUser.createdAt,
        oauthScope: findUser.scope,
        isBuilderProfile: user?.isBuilderProfile ?? false,
    }
}

const resyncGithub = async (userId: string) => {
    const findUser = await GithubAuth.findOne({ userId });
    if (!findUser) {
        throw new Error("User not connected")
    }

    const insightsKeys = await redis.keys(`insights:${userId}:*`);
    const timelineKeys = await redis.keys(`timeline:${userId}:*`);

    const keys = [...insightsKeys, ...timelineKeys];

    if (keys.length > 0) {
        await redis.del(...keys);
    }

    return {
        message: "Github sync properly"
    }
}

const disconnectUser = async (userId: string) => {
    const findUser = await GithubAuth.findOne({ userId });
    if (!findUser) {
        throw new Error("User not connected")
    }

    await GithubAuth.deleteOne({ userId });

    const insightsKeys = await redis.keys(`insights:${userId}:*`);
    const timelineKeys = await redis.keys(`timeline:${userId}:*`);

    const keys = [...insightsKeys, ...timelineKeys];

    if (keys.length > 0) {
        await redis.del(...keys);
    }

    return {
        message: "User disconnected properly"
    }
}

const toggleBuilderProfile = async (userId: string, isBuilderProfile: boolean) => {
    const findUser = await User.findById(userId);
    if (!findUser) {
        throw new Error("User not found")
    }

    findUser.isBuilderProfile = isBuilderProfile;
    await findUser.save();

    if (findUser.githubUsername) {
        await redis.del(`public-profile:${findUser.githubUsername}`);
    }

    return {
        message: "Builder profile toggled properly",
        isBuilderProfile: findUser.isBuilderProfile
    }
}


export const settingsService = {
    getGithubStatus,
    resyncGithub,
    disconnectUser,
    toggleBuilderProfile
}