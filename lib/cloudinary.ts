import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface FileUploadResult {
  url: string;
  publicId: string;
  originalFilename: string;
  format: string;
  bytes: number;
}

export async function uploadFile(
  file: Buffer,
  filename: string,
  folder: string = 'alpha-bet/curriculum'
): Promise<FileUploadResult> {
  try {
    const result = await cloudinary.uploader.upload(
      `data:application/octet-stream;base64,${file.toString('base64')}`,
      {
        resource_type: 'auto',
        public_id: `${folder}/${filename.replace(/\.[^/.]+$/, '')}`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      }
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      originalFilename: filename,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export async function deleteFile(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Failed to delete file from Cloudinary');
  }
}

export function getOptimizedUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | number;
    format?: 'auto' | string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    quality: options.quality || 'auto',
    format: options.format || 'auto',
    width: options.width,
    height: options.height,
  });
}

export default cloudinary;