'use server'

import { revalidatePath } from 'next/cache'
import { supabaseClient } from '../supabase'

export async function uploadImage(file: File): Promise<string> {
  const supabase = supabaseClient()
  
  // Generate unique filename
  const timestamp = Date.now()
  const fileExt = file.name.split('.').pop()
  const fileName = `${timestamp}.${fileExt}`
  const filePath = `activity-images/${fileName}`

  // Convert file to array buffer
  const arrayBuffer = await file.arrayBuffer()
  const fileBytes = new Uint8Array(arrayBuffer)

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('activity-images')
    .upload(filePath, fileBytes, {
      contentType: file.type,
      upsert: false
    })

  if (error) {
    console.error('Upload error:', error)
    throw new Error(error.message || 'Failed to upload image')
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('activity-images')
    .getPublicUrl(filePath)

  if (!urlData?.publicUrl) {
    throw new Error('Failed to get image URL')
  }

  revalidatePath('/activities') // Optional: Revalidate if using ISR
  return urlData.publicUrl
}