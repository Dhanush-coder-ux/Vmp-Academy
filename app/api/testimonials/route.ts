
import { addTestimonial, getTestimonials } from '@/lib/actions/testimonials'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json(testimonials)
  } catch (error) {
    const message = typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : 'Unknown error'
    return NextResponse.json({ message }, { status: 500 })
  }
}

import { supabaseClient } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'


export async function POST(request: Request) {
  try {
    // Verify authentication
    const { userId } = await auth()
    const supabase = supabaseClient()
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const requestBody = await request.json()
    if (!requestBody.name || !requestBody.content) {
      return NextResponse.json(
        { error: 'Name and content are required fields' },
        { status: 400 }
      )
    }

    // Prepare testimonial data
    const testimonialData = {
      name: requestBody.name,
      content: requestBody.content,
      rating: requestBody.rating || null,
      grade: requestBody.grade || null,
      subjects: requestBody.subjects || null,
      author: userId
    }

    // Insert into database
    const { data, error } = await supabase
      .from('testimonials')
      .insert(testimonialData)
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: error.message || 'Database operation failed' },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No data returned from insert operation' },
        { status: 500 }
      )
    }

    return NextResponse.json(data[0], { status: 201 })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    )
  }
}