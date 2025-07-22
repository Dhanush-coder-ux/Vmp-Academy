const StatsSection = () => {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Our Track Record <span className="text-blue-600">Speaks</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Students Guided */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">500+</p>
            <p className="text-gray-600 font-medium">Students Guided</p>
          </div>

          {/* Success Rate */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">95%</p>
            <p className="text-gray-600 font-medium">Success Rate</p>
          </div>

          {/* Years Experience */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">10+</p>
            <p className="text-gray-600 font-medium">Years Experience</p>
          </div>

          {/* Expert Tutors */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">50+</p>
            <p className="text-gray-600 font-medium">Expert Tutors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;