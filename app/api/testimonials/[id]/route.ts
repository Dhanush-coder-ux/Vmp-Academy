
import { deleteTestimonial, updateTestimonial } from '@/lib/actions/testimonials'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    await updateTestimonial(Number(params.id), data)
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteTestimonial(Number(params.id))
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message }, { status: 500 })
  }
}