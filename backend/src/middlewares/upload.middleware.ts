import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { Request } from 'express'
import { ALLOWED_MIME_TYPES } from '../config/constants'
import { env } from '../config/env'

const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  },
})

function fileFilter(
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
): void {
  if ((ALLOWED_MIME_TYPES as readonly string[]).includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error(`Invalid file type. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`))
  }
}

export const uploadMiddleware = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.MAX_FILE_SIZE },
})
