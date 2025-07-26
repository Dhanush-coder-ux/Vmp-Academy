'use client'

import { getTestimonials } from '@/lib/actions/testimonials'
import { useEffect, useState } from 'react'

interface Testimonial {
  id: number
  name: string
  content: string
  rating?: number
  grade?: string
  subjects?: string
  created_at: string
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const data = await getTestimonials()
        
        // if (!respon.ok) {
        //   throw new Error('Failed to fetch testimonials')
        // }
        
        // const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Error loading testimonials')
        }
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  // Convert rating number to stars (if rating exists)
  const renderRating = (rating?: number) => {
    if (!rating) return null
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading testimonials...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our students and parents have to say about their experience at VMP Academy.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  {testimonial.rating && (
                    <div className="text-yellow-400 text-xl mb-3">
                      {renderRating(testimonial.rating)}
                    </div>
                  )}
                  <blockquote className="text-gray-700 italic mb-4">"{testimonial.content}"</blockquote>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    {testimonial.grade && <p className="text-sm text-gray-600">{testimonial.grade}</p>}
                    {testimonial.subjects && (
                      <p className="text-sm text-blue-600 font-medium mt-1">{testimonial.subjects}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Join Our Success Stories Section */}
            <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Join Our Success Stories
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Ready to transform your academic journey? Become part of our growing community of successful students.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#enroll"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Start Your Success Story
                </a>
                <a
                  href="#reviews"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Read More Reviews
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials