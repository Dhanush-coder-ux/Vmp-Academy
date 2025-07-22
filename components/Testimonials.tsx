const Testimonials = () => {
  const testimonials = [
    {
      rating: "★★★★★",
      quote: "VMP Academy helped me improve my grades from C to A in just 3 months! The teachers are amazing and really care about student success.",
      name: "Rahul",
      grade: "Grade 10",
      subjects: "Mathematics & Science"
    },
    {
      rating: "★★★★★",
      quote: "The weekend workshops on programming helped me discover my passion for coding. Great learning environment!",
      name: "Arijun",
      grade: "Grade 11",
      subjects: "Computer Science"
    },
    {
      rating: "★★★★★",
      quote: "The evening tuition sessions made complex topics so much easier! I feel confident about my board exams now.",
      name: "Priya",
      grade: "Grade 12",
      subjects: "Physics & Chemistry"
    },
    {
      rating: "★★★★★",
      quote: "Small class sizes mean I can ask questions freely. My confidence in English literature has improved dramatically.",
      name: "Kavya",
      grade: "Grade 9",
      subjects: "English Literature"
    },
    {
      rating: "★★★★★",
      quote: "Best decision for my child's future! The personalized attention and regular progress reports are excellent.",
      name: "Mrs. Sharma",
      grade: "Parent",
      subjects: "Parent Testimonial"
    },
    {
      rating: "★★★★★",
      quote: "Affordable fees, excellent teaching, and flexible timings. VMP Academy ticks all the boxes for quality education.",
      name: "Mr. Patel",
      grade: "Parent",
      subjects: "Parent Testimonial"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our students and parents have to say about their experience at VMP Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-yellow-400 text-xl mb-3">{testimonial.rating}</div>
              <blockquote className="text-gray-700 italic mb-4">"{testimonial.quote}"</blockquote>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.grade}</p>
                <p className="text-sm text-blue-600 font-medium mt-1">{testimonial.subjects}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Success Stories Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Join Our Success Stories
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Ready to transform your academic journey? Become part of our growing community of successful students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#enroll"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm"
            >
              Start Your Success Story
            </a>
            <a
              href="#reviews"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Read More Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;