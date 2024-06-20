import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
  return NextResponse.json('GET request');
}

export async function POST(request: NextRequest, response: NextResponse) {
  return NextResponse.json('POST request');
}
