'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { createActivity } from '@/lib/actions/activity'
import { uploadImage } from '@/lib/actions/storage'


interface FormData {
  title: string
  description: string
  category: 'workshop' | 'seminar' | 'competition' | 'other'
  duration: string
  imageFile: File | null
}

export default function AddActivityForm({ onSuccess }: { onSuccess?: () => void }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: 'workshop',
    duration: '',
    imageFile: null
  })

  const validateImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error('Only JPG, PNG, or WEBP images are allowed')
      return false
    }

    if (file.size > maxSize) {
      toast.error('Image must be smaller than 5MB')
      return false
    }

    return true
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files[0]
    if (!validateImage(file)) return

    setFormData({ ...formData, imageFile: file })
    
    const reader = new FileReader()
    reader.onload = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form fields
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!formData.description.trim()) {
      toast.error('Description is required')
      return
    }
    if (!formData.duration || isNaN(parseInt(formData.duration))) {
      toast.error('Please enter a valid duration')
      return
    }

    setIsSubmitting(true)

    try {
      let imageUrl = ''
      
      // Upload image if exists
      if (formData.imageFile) {
        try {
          const uploadResult = await uploadImage(formData.imageFile)
          imageUrl = uploadResult || ''
          toast.success('Image uploaded successfully')
        } catch (error) {
          console.error('Image upload error:', error)
          throw new Error('Failed to upload image. Please try again.')
        }
      }
      
      // Create activity
      await createActivity({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        duration: parseInt(formData.duration),
        image_url: imageUrl
      })
      
      toast.success('Activity created successfully!')
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'workshop',
        duration: '',
        imageFile: null
      })
      setImagePreview(null)
      
      // Refresh data
      router.refresh()
      onSuccess?.()
    } catch (error) {
      console.error('Activity creation error:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to create activity'
      )
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">Add New Activity</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Title*</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Description*</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({
                ...formData, 
                category: e.target.value as FormData['category']
              })}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="competition">Competition</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Duration (minutes)*</label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Image</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            onChange={handleImageChange}
            className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          
          {imagePreview && (
            <div className="mt-4 relative h-48 w-full rounded-md overflow-hidden border border-gray-600">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="object-cover h-full w-full"
                onError={() => setImagePreview(null)}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                category: 'workshop',
                duration: '',
                imageFile: null
              })
              setImagePreview(null)
              onSuccess?.()
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Activity'}
          </button>
        </div>
      </form>
    </div>
  )
}