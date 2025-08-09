'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { getActivities } from '@/lib/actions/activity'
import { Activity } from '@/lib/actions/types'

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
      <div className="max-w-4xl mx-auto py-20 px-4">
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
    <div className="py-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-400 leading-tight">
          Our <span className="text-blue-600">Activity</span>
        </h1>
      </div>

      {/* Content Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-black mb-8">Recent Activities</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-transform duration-300 shadow-lg group hover:-translate-y-1 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {activity.image_url && (
                    <div className="relative h-fit w-full mb-3 rounded-md overflow-hidden">
                      <img 
                        src={activity.image_url} 
                        alt={activity.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
              )}

              <div className="p-5">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-black">
                    {new Date(activity.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs  font-medium rounded-full capitalize ${
                      activity.category === 'workshop'
                        ? 'bg-purple-800/30 text-white'
                        : activity.category === 'seminar'
                        ? 'bg-blue-800/30 text-blue-300'
                        : activity.category === 'competition'
                        ? 'bg-green-800/30 text-green-300'
                        : 'bg-zinc-700 text-zinc-600'
                    }`}
                  >
                    {activity.category}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-black line-clamp-1 mb-2">
                  {activity.title}
                </h3>

                <div className="mb-4">
                  <p
                    className={`text-zinc-600 text-sm ${
                      expandedDescriptions[activity.id] ? '' : 'line-clamp-3'
                    }`}
                  >
                    {activity.description}
                  </p>
                  {activity.description.length > 150 && (
                    <button
                      onClick={() => toggleDescription(activity.id)}
                      className="text-blue-400 text-xs mt-1 hover:underline"
                    >
                      {expandedDescriptions[activity.id] ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                <div className="flex items-center text-sm text-zinc-600 gap-2">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{activity.duration} min</span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {activities.length === 0 && (
            <div className="col-span-full text-center py-12 text-zinc-400">
              <svg
                className="mx-auto h-12 w-12 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-3 text-lg font-medium">No activities available</h3>
              <p className="text-sm text-zinc-500">Check back later for upcoming events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
