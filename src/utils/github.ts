export type GithubUser = {
  login: string;
  name?: string;
  bio?: string;
  blog?: string;
  company?: string;
  location?: string;
  avatar_url: string;
  html_url: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  homepage: string | null;
  fork?: boolean;
};

const BASE = 'https://api.github.com';
export const GITHUB_USERNAME = (import.meta as any).env?.VITE_GITHUB_USERNAME || 'DiaeEddineJamal';

export async function fetchGithubUser(username: string): Promise<GithubUser | null> {
  try {
    const res = await fetch(`${BASE}/users/${username}`);
    if (!res.ok) return null;
    return (await res.json()) as GithubUser;
  } catch {
    return null;
  }
}

export async function fetchGithubRepos(username: string): Promise<GithubRepo[]> {
  try {
    const res = await fetch(`${BASE}/users/${username}/repos?per_page=100&sort=updated`);
    if (!res.ok) return [];
    const repos = (await res.json()) as GithubRepo[];
    return repos.filter(r => !r.fork);
  } catch {
    return [];
  }
}

export function aggregateLanguages(repos: GithubRepo[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of repos) {
    if (!r.language) continue;
    counts[r.language] = (counts[r.language] ?? 0) + 1;
  }
  return counts;
}


