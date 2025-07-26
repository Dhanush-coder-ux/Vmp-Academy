export interface UploadImageResponse {
  success: boolean
  url?: string
  error?: string
}

export interface Activity {
  id: string
  title: string
  description: string
  category: 'workshop' | 'seminar' | 'competition' | 'other'
  duration: number
  image_url?: string
  createdAt: string
  updatedAt: string
}