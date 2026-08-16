const GITHUB_USERNAME = 'Rishit-Thaper';

export type GithubSummary = {
  url: string;
  bio: string | null;
  publicRepos: number | null;
  followers: number | null;
  topRepos: { name: string; url: string; description: string | null; stars: number }[];
};

export async function fetchGithubSummary(): Promise<GithubSummary> {
  const url = `https://github.com/${GITHUB_USERNAME}`;

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`, {
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);

    const user = userRes.ok ? await userRes.json() : null;
    const repos = reposRes.ok ? await reposRes.json() : [];

    return {
      url,
      bio: user?.bio ?? null,
      publicRepos: typeof user?.public_repos === 'number' ? user.public_repos : null,
      followers: typeof user?.followers === 'number' ? user.followers : null,
      topRepos: Array.isArray(repos)
        ? repos.map((r: { name: string; html_url: string; description: string | null; stargazers_count: number }) => ({
            name: r.name,
            url: r.html_url,
            description: r.description,
            stars: r.stargazers_count,
          }))
        : [],
    };
  } catch {
    return { url, bio: null, publicRepos: null, followers: null, topRepos: [] };
  }
}
