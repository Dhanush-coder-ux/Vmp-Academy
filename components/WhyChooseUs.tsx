const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 mb-6">
          Why Choose <span className="text-blue-600">VMP Academy?</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          We combine excellence in education with personalized attention to create the perfect learning environment for every student.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/teacher.svg" alt="Expert Tutors" className="w-8 h-7" />
          </div>
          <h3 className="text-xl text-blue-600 font-semibold mb-2">Expert Tutors</h3>
          <p className="text-gray-500">Qualified, passionate educators with proven track records</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/track.svg" alt="Performance Tracking" className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Performance Tracking</h3>
          <p className="text-gray-500">Regular assessments & detailed progress reports for parents</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/grp.svg" alt="Small Class Sizes" className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Small Class Sizes</h3>
          <p className="text-gray-500">Individual attention for every student with personalized learning</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/money.svg" alt="Affordable Fees" className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Affordable Fees</h3>
          <p className="text-gray-500">Quality education without the high cost - value for money</p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/clock.svg" alt="Flexible Scheduling" className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Flexible Scheduling</h3>
          <p className="text-gray-500">Morning, evening & weekend sessions to fit your lifestyle</p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
          <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <img src="/icons/star.svg" alt="Proven Results" className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Proven Results</h3>
          <p className="text-gray-500">95% success rate with improved grades and confidence</p>
        </div>
      </div>

      {/* 24/7 Support */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center bg-white-300 shadow-md border-gray-600 px-6 py-3 rounded-full">
          <img src="/icons/clock.svg" alt="24/7 Support" className="w-5 h-5 mr-2" />
          <span className="font-semibold text-gray-400">24/7 Support</span>
        </div>
      </div>
         <hr className="mt-6 border-none h-[2px] bg-black w-full " />
    </section>
    
  );
};

export default WhyChooseUs;