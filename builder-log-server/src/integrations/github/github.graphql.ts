import axios from "axios";
import { GithubTimelineEvent } from "./github.types.js";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

interface GraphQLResponse<T> {
    data: T;
    errors?: any[];
}

export const githubGraphQL = {
    async fetchContributionEvents(
        accessToken: string,
        from: string,
        to: string,
        limits: { commitLimit: number; prLimit: number }
    ): Promise<GithubTimelineEvent[]> {
        const query = `
         query ($from: DateTime!, $to: DateTime!, $commitLimit: Int!, $prLimit: Int!){
           viewer {
             contributionsCollection(from: $from, to: $to) {
               commitContributionsByRepository {
                repository {
                  name
                  owner {
                  login
                  }  
                }
                  contributions(first: $commitLimit){
                   nodes {
                   occurredAt
                   }
                  }
               }
                  pullRequestContributionsByRepository {
                    repository {
                      name
                      owner {
                       login
                      }
                    }
                    contributions(first: $prLimit) {
                    nodes {
                     occurredAt
                    }
                    }
                  }
               
               }
           }
         }
        `

        const response = await axios.post<
            GraphQLResponse<any>
        >(
            GITHUB_GRAPHQL_URL,
            {
                query,
                variables: {
                    from,
                    to,
                    commitLimit: limits.commitLimit,
                    prLimit: limits.prLimit
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.errors) {
            console.error("GitHub GraphQL errors:", JSON.stringify(response.data.errors, null, 2));
            throw new Error(`Github graphql error: ${response.data.errors[0]?.message || 'Unknown error'}`)
        }

        const collections = response.data.data.viewer.contributionsCollection;

        const events: GithubTimelineEvent[] = [];

        //commits
        for (const repo of collections.commitContributionsByRepository) {
            for (const node of repo.contributions.nodes) {
                events.push({
                    type: 'commit',
                    repoOwner: repo.repository.owner.login,
                    repoName: repo.repository.name,
                    occurredAt: node.occurredAt,
                })
            }
        }

        //for pull requests
        for (const repo of collections.pullRequestContributionsByRepository) {
            for (const node of repo.contributions.nodes) {
                events.push({
                    type: "pull_request",
                    repoOwner: repo.repository.owner.login,
                    repoName: repo.repository.name,
                    occurredAt: node.occurredAt,
                });
            }
        }

        return events;
    },
};