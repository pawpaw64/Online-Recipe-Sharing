import { Request, Response } from 'express'
import * as profileService from '../services/profile.service'

export async function getProfile(req: Request, res: Response): Promise<void> {
  const profile = await profileService.getPublicProfile(req.params.userId)
  res.json({ success: true, data: profile })
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const profile = await profileService.updateProfile(req.user!.userId, req.body)
  res.json({ success: true, data: profile })
}
