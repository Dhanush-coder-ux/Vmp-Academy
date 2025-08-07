'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState, useCallback } from 'react'
import AdminCourseForm from '@/components/AdminCourseForm'
import { ToastContainer, toast } from 'react-toastify'
import { getCourses, deleteCourse as deleteCourseAction } from '@/lib/actions/course.action'
import AdminTestimonial from '@/components/AdminTestimonial'
import AddActivityForm from '@/components/AddActivityForm'
import { deleteActivity, getActivities } from '@/lib/actions/activity'
import { useRouter } from 'next/navigation'
// import { getActivities, deleteActivity } from '@/lib/actions/activity'

interface Course {
  id: number
  title: string
  type: 'school' | 'skills'
  grades?: string
  level?: string
  description: string
  duration: string
  syllabus: string[]
  projects?: number
  author: string
  created_at?: string
  updated_at?: string
}

interface Activity {
  id: string
  title: string
  description: string
  category: string
  duration: number
  imageUrl?: string
  createdAt: string
}

export default function AdminDashboard() {
   const { user, isLoaded } = useUser()
   const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [editCourse, setEditCourse] = useState<Course | null>(null)
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'courses' | 'testimonials' | 'activities'>('courses')
   



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

  const loadActivities = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getActivities()
      setActivities(data)
    } catch (err) {
      setError('Failed to load activities')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleDeleteCourse = async (id: number) => {
    if (!confirm('Are you sure you want to delete this course?')) return
    
    try {
      const result = await deleteCourseAction(id)
      if (result === true) {
        toast.success('Course deleted successfully')
        await loadCourses()
      } else {
        setError(result || 'Failed to delete course')
      }
    } catch (err) {
      setError('Failed to delete course')
      console.error(err)
    }
  }

  const handleDeleteActivity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return
    
    try {
      await deleteActivity(id)
      toast.success('Activity deleted successfully')
      await loadActivities()
    } catch (err) {
      setError('Failed to delete activity')
      console.error(err)
    }
  }

  useEffect(() => {
    if (activeTab === 'courses') {
      loadCourses()
    } else if (activeTab === 'activities') {
      loadActivities()
    }
  }, [activeTab, loadCourses, loadActivities])


    const isAdmin = user?.publicMetadata?.role === 'admin'

    useEffect(() => {
    if (isLoaded && !isAdmin) {
      router.push('/unauthorized')
    }
  }, [isLoaded, isAdmin, router])

 


  
   if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading Admin...</div>
      </div>
    );
  }

  // Show unauthorized message if not admin (though redirect should happen first)
  if (!isAdmin) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-black">Unauthorized Access</h1>
        <p className="text-gray-400">You don't have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'courses' ? 'text-black border-b-2 border-blue-500' : 'text-gray-400 '}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'activities' ? 'text-black border-b-2 border-blue-500' : 'text-gray-400 '}`}
          onClick={() => setActiveTab('activities')}
        >
          Activities
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'testimonials' ? 'text-black border-b-2 border-blue-500' : 'text-gray-400 '}`}
          onClick={() => setActiveTab('testimonials')}
        >
          Testimonials
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {activeTab === 'courses' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Manage Courses</h1>
            <button 
              onClick={() => { setEditCourse(null); setShowCourseForm(true) }} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + Add Course
            </button>
          </div>

          {showCourseForm && (
            <AdminCourseForm
              course={editCourse}
              onSuccess={() => {
                loadCourses()
                setShowCourseForm(false)
                setEditCourse(null)
              }}
            />
          )}

          {isLoading ? (
            <div className="text-black">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {courses.map(course => (
                <div key={course.id} className="bg-black border border-gray-700 p-4 rounded-md shadow-md">
                  <h2 className="font-bold">{course.title}</h2>
                  <p className="text-sm text-gray-500">{course.description}</p>
                  <div className="mt-3 flex gap-3">
                    <button 
                      onClick={() => { setEditCourse(course); setShowCourseForm(true) }} 
                      className="text-sm px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition-colors"
                    >
                      <img src="/icons/edit.svg" width={20} height={20} alt="Edit" className="inline-block w-4 h-4 mr-1" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCourse(course.id)} 
                      className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <img src="/icons/delete.svg"  width={20} height={20} alt="" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : activeTab === 'activities' ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-black">Manage Activities</h1>
            <button 
              onClick={() => setShowActivityForm(true)} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + Add Activity
            </button>
          </div>

          {showActivityForm && (
            <AddActivityForm
              onSuccess={() => {
                loadActivities()
                setShowActivityForm(false)
              }}
              onCancel={() => setShowActivityForm(false)}
            />
          )}

          {isLoading ? (
            <div className="text-black">Loading activities...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {activities.map(activity => (
                <div key={activity.id} className="bg-black border border-gray-700 p-4 rounded-md shadow-md">
                  {activity.imageUrl && (
                    <div className="relative h-40 w-full mb-3 rounded-md overflow-hidden">
                      <img 
                        src={activity.imageUrl} 
                        alt={activity.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <h2 className="font-bold">{activity.title}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">{activity.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {activity.category} • {activity.duration} mins
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDeleteActivity(activity.id)} 
                        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        <img src="/icons/delete.svg"  width={20} height={20} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <AdminTestimonial />
      )}
    </div>
  )
}