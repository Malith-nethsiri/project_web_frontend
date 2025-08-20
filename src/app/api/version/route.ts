import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    sha: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    msg: 'deployment test',
    time: new Date().toISOString(),
    node: process.version,
    env: process.env.NODE_ENV,
    buildId: process.env.NEXT_PUBLIC_BUILD_ID || 'no-build-id',
    cssTest: 'If you see this, API is working'
  });
}