import { uploadFile } from '../utils/storage'
import { AppError } from '../utils/AppError'

export async function handleImageUpload(
  file: Express.Multer.File | undefined,
  baseUrl: string,
): Promise<{ url: string }> {
  if (!file) throw new AppError('No file provided', 400, 'NO_FILE')
  return uploadFile(file, baseUrl)
}
