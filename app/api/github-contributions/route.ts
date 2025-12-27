import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const user = url.searchParams.get("user") || process.env.GITHUB_USERNAME;

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Missing GITHUB_TOKEN in server environment" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Missing GitHub username (provide ?user= or set GITHUB_USERNAME)",
        },
        { status: 400 }
      );
    }

    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const resp = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { login: user } }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json(
        { error: "GitHub API error", details: txt },
        { status: resp.status }
      );
    }

    const json = await resp.json();
    return NextResponse.json(json);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
