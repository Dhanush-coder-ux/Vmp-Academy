'use server'

import { supabaseClient } from '../supabase'
import { auth } from '@clerk/nextjs/server'

interface Testimonial {
  id?: number
  name: string
  content: string
  rating?: number
  grade?: string
  subjects?: string
  author?: string
  created_at?: string
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const supabase = supabaseClient()
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'Failed to fetch testimonials')
  }

  return data || []
}

export const addTestimonial = async (
  formData: FormData
): Promise<Testimonial> => {
  const supabase = supabaseClient()
  const { userId:author } = await auth()

  if(!author){
    return Promise.reject(new Error('Authentication required'))
  }

 

  // Extract form data
  const testimonial = {
    name: formData.get('name') as string,
    content: formData.get('content') as string,
    rating: formData.get('rating') ? Number(formData.get('rating')) : undefined,
    grade: formData.get('grade') as string || undefined,
    subjects: formData.get('subjects') as string || undefined
  }

  // Validate required fields
  if (!testimonial.name || !testimonial.content) {
    throw new Error('Name and content are required')
  }

  const payload = {
    ...testimonial,
    author,
    rating: testimonial.rating || null,
    grade: testimonial.grade || null,
    subjects: testimonial.subjects || null
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert(payload)
    .select('*')

  if (error) {
    throw new Error(error.message || 'Failed to add testimonial')
  }

  if (!data || data.length === 0) {
    throw new Error('No data returned after insert')
  }

  return data[0]
}

export const deleteTestimonial = async (id: number): Promise<boolean> => {
  const supabase = supabaseClient()
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Authentication required')
  }

  // Verify the testimonial exists and belongs to the user
  const { data: existing } = await supabase
    .from('testimonials')
    .select('author')
    .eq('id', id)
    .single()

  if (!existing) {
    throw new Error('Testimonial not found')
  }

  if (existing.author !== userId) {
    throw new Error('Unauthorized to delete this testimonial')
  }

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'Failed to delete testimonial')
  }

  return true
}

export const updateTestimonial = async (
  id: number,
  formData: FormData
): Promise<Testimonial> => {
  const supabase = supabaseClient()
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Authentication required')
  }

  // // Verify the testimonial exists and belongs to the user
  // const { data: existing } = await supabase
  //   .from('testimonials')
  //   .select('author')
  //   .eq('id', id)
  //   .single()

  // if (!existing) {
  //   throw new Error('Testimonial not found')
  // }

  // if (existing.author !== userId) {
  //   throw new Error('Unauthorized to update this testimonial')
  // }

  // Extract form data
  const testimonial = {
    name: formData.get('name') as string,
    content: formData.get('content') as string,
    rating: formData.get('rating') ? Number(formData.get('rating')) : undefined,
    grade: formData.get('grade') as string || undefined,
    subjects: formData.get('subjects') as string || undefined
  }

  // Clean the update payload to remove undefined values
  const cleanPayload = Object.fromEntries(
    Object.entries(testimonial).filter(([_, v]) => v !== undefined)
  )

  const { data, error } = await supabase
    .from('testimonials')
    .update(cleanPayload)
    .eq('id', id)
    .select('*')

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'Failed to update testimonial')
  }

  if (!data || data.length === 0) {
    throw new Error('No data returned after update')
  }

  return data[0]
}