import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return NextResponse.json(`GET ${params.id}`);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return NextResponse.json(`PUT ${params.id}`);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  return NextResponse.json(`DELETE ${params.id}`);
}
