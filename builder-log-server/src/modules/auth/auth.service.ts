import axios from "axios"
import { GithubTokenResponse } from "./auth.interface.js";
import { User } from "../user/user.model.js";
import { GithubAuth } from "./githubAuth.model.js";
import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:5000/auth/github/callback"

const handleGithubCallback = async (code: string) => {
    const tokenResponse = await axios.post<GithubTokenResponse>(
        GITHUB_TOKEN_URL,
        {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        {
            headers: {
                Accept: "application/json",
            }
        }
    );

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
        throw new Error("Failed to obtain access token from GitHub");
    }

    const userResponse = await axios.get(GITHUB_USER_URL, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const githubUser = userResponse.data;

    const user = await User.findOneAndUpdate(
        { githubId: githubUser.id.toString() },
        {
            githubId: githubUser.id.toString(),
            githubUsername: githubUser.login,
            githubAvatarUrl: githubUser.avatar_url,
            githubProfileUrl: githubUser.html_url,
            bio: githubUser.bio,
            lastLoginAt: new Date(),
        },
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        }
    );

    await GithubAuth.findOneAndUpdate(
        { userId: user._id },
        {
            userId: user._id,
            accessToken: accessToken,
            scope: tokenResponse.data.scope,
        },
        {
            upsert: true,
            new: true
        }
    );


    return {
        accessToken,
        githubUser,
        user
    }
}

const startGithubAuth = () => {
    const redirectUrl =
        "https://github.com/login/oauth/authorize" +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}` +
        `&scope=read:user public_repo`;

    return redirectUrl;
}

const startGithubUpgrade = () => {
    const redirectUrl =
        "https://github.com/login/oauth/authorize" +
        `?client_id=${process.env.GITHUB_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}` +
        `&scope=read:user repo`;

    return redirectUrl;
}

export const authService = {
    handleGithubCallback,
    startGithubAuth,
    startGithubUpgrade
}