'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('./LeafletMap'),
  { 
    ssr: false,
    loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-md" />
  }
);

const ContactForm = () => {
  // Coordinates for your location (replace with your actual coordinates)
   const location = {
    lat: 9.944342,
    lng: 78.127510,
    address: "BB Kulam Salai, Madurai, Tamil Nadu 625001"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
       <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Contact<span className="text-blue-600">Us</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions about our programs? Need guidance on course selection? We're here to help you make the best decision for your educational journey.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-shadow-white-50 mb-2">Get in Touch</h2>
        <p className="text-white">
          Ready to start your academic transformation? Reach out to us through any of the channels below. 
          Our education consultants are ready to answer all your questions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <LocationIcon />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Our Location</h3>
              <p className="text-gray-600">{location.address}</p>
              
              {/* Map Integration */}
              <div className="mt-4">
                <MapWithNoSSR center={[location.lat, location.lng]} />
                <p className="text-xs text-white mt-1">
                  View on <a 
                    href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    OpenStreetMap
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <PhoneIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Call Us</h3>
              <p className="text-gray-700">+91 98765 43210<br />+91 87654 32109</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <EmailIcon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Email Us</h3>
              <p className="text-gray-700">info@vmpacademy.com<br />admissions@vmpacademy.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Your first name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Your last name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-white mb-1">Grade/Standard</label>
              <input
                type="text"
                id="grade"
                placeholder="e.g., Grade 10, Class 12"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white mb-1">Subject of Interest</label>
              <input
                type="text"
                id="subject"
                placeholder="Mathematics, Science, English, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-1">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Icon components
function LocationIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export default ContactForm;