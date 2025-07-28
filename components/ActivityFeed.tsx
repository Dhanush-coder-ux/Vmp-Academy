'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getActivities } from '@/lib/actions/activity'
import { Activity } from '../lib/actions/types'

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true)
        const data = await getActivities()
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
        console.error('Error fetching activities:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [])

  const toggleDescription = (id: number) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          <button 
            onClick={() => window.location.reload()}
            className="ml-4 text-blue-600 hover:text-blue-800"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className=" mx-auto py-8 ">
      <h2 className="text-2xl font-bold text-white mb-6">Recent Activities</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-black rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors group"
          >
            {activity.image_url && (
              <div className="relative h-64 w-full">
                <Image
                  src={activity.image_url}
                  alt={`Cover image for ${activity.title}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={activities.indexOf(activity) < 3}
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-sm text-gray-400">
                  {new Date(activity.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.category === 'workshop' ? 'bg-purple-900 text-purple-200' :
                  activity.category === 'seminar' ? 'bg-blue-900 text-blue-200' :
                  activity.category === 'competition' ? 'bg-green-900 text-green-200' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {activity.category}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {activity.title}
              </h3>
              
              <div className="mb-4">
                <p className={`text-gray-300 ${
                  expandedDescriptions[activity.id] ? '' : 'line-clamp-3'
                }`}>
                  {activity.description}
                </p>
                {activity.description.length > 150 && (
                  <button
                    onClick={() => toggleDescription(activity.id)}
                    className="text-blue-400 text-sm mt-2 hover:underline"
                  >
                    {expandedDescriptions[activity.id] ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{activity.duration} minutes</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium">No activities available</h3>
            <p className="mt-1">Check back later for upcoming events</p>
          </div>
        )}
      </div>
    </div>
  )
}