import axios from "axios";
import { GithubCommit, GithubPullRequest } from "./github.types.js"

const GITHUB_REST_URL = "https://api.github.com";

export const githubREST = {
    async fetchCommits(
        accessToken: string,
        owner: string,
        repo: string,
        since: string,
        until: string
    ): Promise<GithubCommit[]> {
        const res = await axios.get(`${GITHUB_REST_URL}/repos/${owner}/${repo}/commits`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                since,
                until
            }
        }
        );

        return res.data.map((commit: any) => ({
            sha: commit.sha,
            message: commit.commit.message,
            committedAt: commit.commit.committer.date,
            url: commit.html_url
        }))
    },

    async fetchPullRequest(
        accessToken: string,
        owner: string,
        repo: string,
        number: number
    ): Promise<GithubPullRequest> {
        const res = await axios.get(
            `${GITHUB_REST_URL}/repos/${owner}/${repo}/pulls/${number}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const pr = res.data;

        return {
            id: pr.id,
            number: pr.number,
            title: pr.title,
            merged: !!pr.merged_at,
            createdAt: pr.created_at,
            mergedAt: pr.merged_at ?? undefined,
            url: pr.html_url,
        };
    },
};