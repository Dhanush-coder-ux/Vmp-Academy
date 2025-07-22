'use client'
import { useState, FormEvent, ChangeEvent } from 'react';
import { FiCheckCircle, FiChevronRight, FiUser, FiBook, FiCalendar } from 'react-icons/fi';

const EnrollmentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    grade: '',
    schedule: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const courses = [
    { id: 'math', name: 'Mathematics (CBSE/ICSE)' },
    { id: 'science', name: 'Science (Physics, Chemistry)' },
    { id: 'python', name: 'Python Programming' },
    { id: 'design', name: 'Graphic Design' }
  ];

  const schedules = [
    'Weekday Morning (9AM-12PM)',
    'Weekday Afternoon (2PM-5PM)',
    'Weekend (10AM-2PM)',
    'Evening (6PM-9PM)'
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e:FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (!formData.course || 
        ((formData.course === 'Mathematics (CBSE/ICSE)' || formData.course === 'Science (Physics, Chemistry)') && !formData.grade)) {
      alert('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const ProgressSteps = () => (
    <div className="flex justify-between mb-8 relative">
      <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-0">
        <div 
          className={`h-1 bg-blue-600 transition-all duration-300 ${step >= 1 ? 'w-1/2' : 'w-0'} ${step >= 2 ? 'w-full' : ''}`}
        ></div>
      </div>
      {[1, 2].map((stepNum) => (
        <div key={stepNum} className="flex flex-col items-center z-10">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }`}>
            {step > stepNum ? <FiCheckCircle /> : stepNum}
          </div>
          <span className={`text-xs mt-2 ${
            step >= stepNum ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {stepNum === 1 ? 'Details' : 'Course'}
          </span>
        </div>
      ))}
    </div>
  );

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheckCircle className="text-green-600 dark:text-green-400 text-4xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enrollment Request Received!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your interest in {formData.course}. We'll contact you at {formData.email} within 24 hours to complete the process.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left mb-6">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">What to Expect:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
            <li>Confirmation call from our team</li>
            <li>Fee structure and payment options</li>
            <li>Orientation schedule</li>
          </ul>
        </div>
        <button 
          onClick={() => {
            setIsSuccess(false);
            setStep(1);
            setFormData({
              name: '',
              email: '',
              phone: '',
              course: '',
              grade: '',
              schedule: ''
            });
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Enroll Another Student
        </button>
      </div>
    );
  }

  return (
    <div id='entroll' className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enroll Now</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Start your learning journey with VMP Academy</p>
      
      <ProgressSteps />

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student Name*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 dark:text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                placeholder="+91 9876543210"
                required
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
            >
              Next: Select Course <FiChevronRight className="ml-1" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Course*</label>
              <div className="space-y-2">
                {courses.map((course) => (
                  <div 
                    key={course.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, course: course.name }));
                    }}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.course === course.name 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                        formData.course === course.name 
                          ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400' 
                          : 'border-gray-400 dark:border-gray-500'
                      }`}>
                        {formData.course === course.name && <FiCheckCircle className="text-white text-xs" />}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{course.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(formData.course === 'Mathematics (CBSE/ICSE)' || formData.course === 'Science (Physics, Chemistry)') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grade/Class*</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select Grade</option>
                  {[6,7,8,9,10,11,12].map(grade => (
                    <option key={grade} value={`Grade ${grade}`}>Grade {grade}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Schedule</label>
              <div className="grid grid-cols-2 gap-2">
                {schedules.map((schedule) => (
                  <div
                    key={schedule}
                    onClick={() => setFormData(prev => ({ ...prev, schedule }))}
                    className={`p-3 border rounded-lg cursor-pointer text-center text-sm ${
                      formData.schedule === schedule 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:border-blue-400' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                    }`}
                  >
                    <span className="text-gray-900 dark:text-white">{schedule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Enrollment'
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EnrollmentForm;