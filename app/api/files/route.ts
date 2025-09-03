import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getFileUrl } from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    console.log('Cloudinary config:', {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? 'exists' : 'missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'exists' : 'missing',
    });

    // Get files from Cloudinary using admin API
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'alpha-bet/',
      max_results: 100
    });

    // Transform the files to use correct URLs
    const files = (result.resources || []).map((file: any) => ({
      ...file,
      secure_url: getFileUrl(file.public_id, file.format)
    }));

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error('Cloudinary list error:', error);
    return NextResponse.json(
      { error: 'Failed to list files', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}