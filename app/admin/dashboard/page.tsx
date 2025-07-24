'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import AdminCourseForm from '@/components/AdminCourseForm'
import { getCourses, deleteCourse as deleteCourseAction } from '@/lib/actions/course.action'
interface Course {
  id: number
  title: string
  type: 'school' | 'skills'
  grades?: string           // Only for 'school' type courses
  level?: string            // Only for 'skills' type courses
  description: string
  duration: string
  syllabus: string[]        // Array of strings (split by newlines)
  projects?: number         // Only for 'skills' type courses
  author: string            // User ID from Clerk
  created_at?: string       // Automatically added by Supabase
  updated_at?: string       // Automatically added by Supabase
}

export default function AdminDashboard() {
  const { user } = useUser()
  const [courses, setCourses] = useState<Course[]>([])
  const [editCourse, setEditCourse] = useState<Course | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAdmin = user?.publicMetadata?.role === 'admin'

  const loadCourses = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getCourses()
      if (Array.isArray(data)) {
        setCourses(data)
      }
    } catch (err) {
      setError('Failed to load courses')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDeleteCourse = async (id: number) => {
    try {
      const result = await deleteCourseAction(id)
      if (result === true) {
        await loadCourses()
      } else {
        setError(result || 'Failed to delete course')
      }
    } catch (err) {
      setError('Failed to delete course')
      console.error(err)
    }
  }

  useEffect(() => {
    if (isAdmin) loadCourses()
  }, [isAdmin, loadCourses])



  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Manage Courses</h1>
        <button 
          onClick={() => { setEditCourse(null); setShowForm(true) }} 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Course
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <AdminCourseForm
          course={editCourse}
          onSuccess={() => {
            loadCourses()
            setShowForm(false)
            setEditCourse(null)
          }}
        />
      )}

      {isLoading ? (
        <div className="text-white">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {courses.map(course => (
            <div key={course.id} className="bg-black border border-gray-700 p-4 rounded-md shadow-md">
              <h2 className="font-bold">{course.title}</h2>
              <p className="text-sm text-gray-500">{course.description}</p>
              <div className="mt-3 flex gap-3">
                <button 
                  onClick={() => { setEditCourse(course); setShowForm(true) }} 
                  className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id)} 
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}