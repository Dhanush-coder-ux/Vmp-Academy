'use server'

import { Activity } from './types'
import { supabaseClient } from '../supabase'



export async function createActivity(activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) {
  const supabase = supabaseClient()
  
  const { data, error } = await supabase
    .from('activities')
    .insert({
      ...activity,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    
  if (error) {
    throw new Error(error.message)
  }
  
  return data[0]
}

export async function getActivities(): Promise<Activity[]> {
  const supabase = supabaseClient()
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    
  if (error) {
    throw new Error(error.message)
  }
  
  return data.map(item => ({
    ...item,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }))
}


export async function deleteActivity(id: string): Promise<boolean> {
  const supabase = supabaseClient()
  
  // First check if activity exists
  const { data: existing } = await supabase
    .from('activities')
    .select('id')
    .eq('id', id)
    .single()

  if (!existing) {
    throw new Error('Activity not found')
  }

  // Delete the activity
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error)
    throw new Error(error.message || 'Failed to delete activity')
  }

  return true
}