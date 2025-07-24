'use client'

import { useState, useEffect } from 'react';
import { getCourses } from '@/lib/actions/course.action';

type Course = {
  id: string;
  title: string;
  description: string;
  type: 'school' | 'skills';
  grades?: string;
  level?: string;
  projects?: number;
  syllabus: string[];
  duration: string;
}

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState('school');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setError('Failed to fetch courses: Invalid data format');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const toggleCourse = (id: string) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  // Filter courses by type
  const schoolCourses = courses.filter(course => course.type === 'school');
  const skillCourses = courses.filter(course => course.type === 'skills');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our <span className="text-blue-600">Courses</span>
          </h1>
          <p className="text-lg text-shadow-white-50 max-w-3xl mx-auto">
            Comprehensive learning programs designed for academic excellence and skill development
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setActiveTab('school')}
              className={`px-6 py-3 text-sm font-medium rounded-l-lg ${activeTab === 'school' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              School Syllabus
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-6 py-3 text-sm font-medium rounded-r-lg ${activeTab === 'skills' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              Skill Development
            </button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeTab === 'school' ? schoolCourses : skillCourses).map((course) => (
            <div 
              key={course.id}
              className={`bg-black border border-gray-700 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${expandedCourse === course.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-shadow-white-50">{course.title}</h3>
                    <p className="text-blue-600 font-medium mt-1">
                      {course.type === 'school' ? `Grades: ${course.grades}` : `Level: ${course.level}`}
                    </p>
                  </div>
                  {course.type === 'skills' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {course.projects}+ Projects
                    </span>
                  )}
                </div>
                
                <p className="mt-3 text-gray-600">{course.description}</p>
                
                <button
                  onClick={() => toggleCourse(course.id)}
                  className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  {expandedCourse === course.id ? 'Hide Syllabus' : 'View Syllabus'}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedCourse === course.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-shadow-white-50 mb-2">Course Content:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.isArray(course.syllabus) && course.syllabus.map((item, index) => (
                        <li key={index} className="text-gray-600">{item}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between items-center">
                      <span>{course.duration}</span>
                      <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Need help choosing  <span className='text-blue-700'>a course?</span> </h3>
          <p className="text-gray-600 mb-6">Our academic advisors can help you select the perfect program</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg">
            Speak to an Advisor
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;