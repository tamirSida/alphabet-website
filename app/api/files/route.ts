import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    // Get files from Cloudinary
    const result = await cloudinary.search
      .expression('folder:alpha-bet/*')
      .sort_by([['created_at', 'desc']])
      .max_results(100)
      .execute();

    return NextResponse.json({
      success: true,
      files: result.resources || [],
    });
  } catch (error) {
    console.error('Cloudinary list error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}