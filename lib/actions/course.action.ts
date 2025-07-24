// lib/actions/course.action.ts
'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseClient } from '../supabase'

type CoursePayload = {
  title: string
  type: 'school' | 'skills'
  grades?: string
  level?: string
  description: string
  duration: string
  syllabus: string // textarea -> \n separated
  projects?: number
}

export async function addCourse(courseData: CoursePayload) {
  const supabase = supabaseClient()
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error('Authentication required')
  }

  const payload = {
    ...courseData,
    author: userId,
    syllabus: courseData.syllabus?.split('\n').map(s => s.trim()).filter(Boolean) ?? [],
  }

  const { data, error } = await supabase
    .from('courses')
    .insert(payload)
    .select('*')

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message || 'Failed to create course')
  }

  return data?.[0]
}

export const getCourses = async () => {
    const supabase = supabaseClient();
    const { data, error } = await supabase.from('courses').select('*');
    
    if (error) return error.message
    
    return data;
}

export const deleteCourse = async (id: number) => {
    const supabase = supabaseClient();
    const { error } = await supabase.from('courses').delete().eq('id', id);
    
    if (error) return error.message
    
    return true;
}