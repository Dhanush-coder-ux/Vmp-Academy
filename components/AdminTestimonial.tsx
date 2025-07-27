'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { 
  getTestimonials, 
  addTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../lib/actions/testimonials'

export default function AdminTestimonial() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    rating: 5,
    grade: '',
    subjects: ''
  })

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const data = await getTestimonials()
      setTestimonials(data)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast.error(
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message || 'Failed to load testimonials'
          : 'Failed to load testimonials'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.content) {
      toast.error('Name and content are required')
      return
    }

    try {
      setLoading(true)
      
      const formDataObj = new FormData()
      formDataObj.append('name', formData.name)
      formDataObj.append('content', formData.content)
      formDataObj.append('rating', formData.rating.toString())
      formDataObj.append('grade', formData.grade)
      formDataObj.append('subjects', formData.subjects)

      if (editingId) {
        await updateTestimonial(editingId, formDataObj)
        toast.success('Testimonial updated successfully!')
      } else {
        await addTestimonial(formDataObj)
        toast.success('Testimonial added successfully!')
      }

      setFormData({ name: '', content: '', rating: 5, grade: '', subjects: '' })
      setEditingId(null)
      await fetchTestimonials()
      router.refresh()
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message || 'An error occurred'
          : 'An error occurred'
      )
    } finally {
      setLoading(false)
    }
  }

  // Handle edit
  const handleEdit = (testimonial: any) => {
    setFormData({
      name: testimonial.name,
      content: testimonial.content,
      rating: testimonial.rating || 5,
      grade: testimonial.grade || '',
      subjects: testimonial.subjects || ''
    })
    setEditingId(testimonial.id)
  }

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      setLoading(true)
      await deleteTestimonial(id)
      toast.success('Testimonial deleted successfully!')
      await fetchTestimonials()
      router.refresh()
    } catch (error) {
      console.error('Deletion error:', error)
      toast.error(
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message || 'Failed to delete'
          : 'Failed to delete'
      )
    } finally {
      setLoading(false)
    }
  }

  // ... rest of your JSX remains the same
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Manage Testimonials</h1>
      
      {/* Add/Edit Form */}
      <div className="bg-black border border-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 mb-2">
              Content*
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Additional fields (rating, grade, subjects) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label htmlFor="rating" className="block text-gray-700 mb-2">
                Rating (1-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="grade" className="block text-gray-700 mb-2">
                Grade/Level
              </label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="subjects" className="block text-gray-700 mb-2">
                Subjects
              </label>
              <input
                type="text"
                id="subjects"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', content: '', rating: 5, grade: '', subjects: '' })
                  setEditingId(null)
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Processing...' : editingId ? 'Update' : 'Add'} Testimonial
            </button>
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Testimonials</h2>
        
        {loading && testimonials.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-500">No testimonials found.</p>
        ) : (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-black border border-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-shadow-violet-50">{testimonial.name}</h3>
                    <p className="text-gray-400 mt-2">{testimonial.content}</p>
                    <div className="mt-3 text-sm">
                      {testimonial.rating && (
                        <p className="text-yellow-500">
                          {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
                        </p>
                      )}
                      {testimonial.grade && <p className="text-gray-300">Grade: {testimonial.grade}</p>}
                      {testimonial.subjects && <p className="text-blue-600">Subjects: {testimonial.subjects}</p>}
                      <p className="text-gray-300 mt-2">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}