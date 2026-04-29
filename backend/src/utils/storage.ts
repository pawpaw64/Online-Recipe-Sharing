import { env } from '../config/env'
import path from 'path'
import fs from 'fs'

export interface StorageResult {
  url: string
}

async function saveLocal(
  file: Express.Multer.File,
  baseUrl: string,
): Promise<StorageResult> {
  // File is already saved to disk by Multer; just return the URL
  const relativePath = file.path.replace(/\\/g, '/')
  const filename = path.basename(relativePath)
  return { url: `${baseUrl}/uploads/${filename}` }
}

async function saveCloudinary(file: Express.Multer.File): Promise<StorageResult> {
  // Dynamic import to avoid loading cloudinary when not in use
  const { v2: cloudinary } = await import('cloudinary')
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  })
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'cookbook',
  })
  fs.unlinkSync(file.path)
  return { url: result.secure_url }
}

async function saveS3(file: Express.Multer.File): Promise<StorageResult> {
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3')
  const s3 = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  })
  const key = `cookbook/${Date.now()}-${path.basename(file.originalname)}`
  const fileBuffer = fs.readFileSync(file.path)
  await s3.send(
    new PutObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: key,
      Body: fileBuffer,
      ContentType: file.mimetype,
    }),
  )
  fs.unlinkSync(file.path)
  return { url: `https://${env.AWS_BUCKET}.s3.${env.AWS_REGION}.amazonaws.com/${key}` }
}

export async function uploadFile(
  file: Express.Multer.File,
  baseUrl: string,
): Promise<StorageResult> {
  switch (env.STORAGE_DRIVER) {
    case 'cloudinary':
      return saveCloudinary(file)
    case 's3':
      return saveS3(file)
    default:
      return saveLocal(file, baseUrl)
  }
}
