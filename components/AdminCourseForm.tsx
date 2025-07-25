'use client'

import { useState } from 'react'
import { addCourse } from '@/lib/actions/course.action'

type CourseFormData = {
  title: string
  type: 'school' | 'skills'
  grades: string
  level: string
  description: string
  duration: string
  syllabus: string
  projects: string | number
}

type AdminCourseFormProps = {
  course?: CourseFormData | null
  onSuccess?: () => void
}

export default function AdminCourseForm({ course = null, onSuccess }: AdminCourseFormProps) {
  const isEdit = !!course
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<CourseFormData>({
    title: course?.title || '',
    type: course?.type || 'school',
    grades: course?.grades || '',
    level: course?.level || '',
    description: course?.description || '',
    duration: course?.duration || '',
    syllabus: Array.isArray(course?.syllabus) ? course.syllabus.join('\n') : (course?.syllabus || ''),
    projects: course?.projects || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Convert projects to number if it exists
      const payload = {
        ...formData,
        projects: formData.projects ? Number(formData.projects) : undefined
      }

      const result = await addCourse(payload)
      
      if (typeof result === 'string') {
        // This means we got an error message back
        setError(result)
      } else {
        // Success case
        onSuccess?.()
      }
    } catch (err) {
      setError('Failed to submit the form. Please try again.')
      console.error('Submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black p-4 rounded-md shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-white">
        {isEdit ? 'Edit' : 'Add'} Course
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        >
          <option value="school">School</option>
          <option value="skills">Skills</option>
        </select>

        {formData.type === 'school' ? (
          <input
            name="grades"
            placeholder="Grades (e.g., Class 6-12)"
            value={formData.grades}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300"
            required={formData.type === 'school'}
          />
        ) : (
          <>
            <input
              name="level"
              placeholder="Level (e.g., Beginner to Advanced)"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
              required={formData.type === 'skills'}
            />
            <input
              name="projects"
              placeholder="Number of Projects"
              type="number"
              min="0"
              value={formData.projects}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
              required={formData.type === 'skills'}
            />
          </>
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 min-h-[100px]"
          required
        />

        <textarea
          name="syllabus"
          placeholder="Syllabus (one item per line)"
          value={formData.syllabus}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 min-h-[100px]"
          required
        />

        <input
          name="duration"
          placeholder="Duration (e.g., 3 months)"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`bg-blue-600 text-white px-4 py-2 rounded-md w-full ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Processing...' : isEdit ? 'Update' : 'Add'} Course
      </button>
    </form>
  )
}