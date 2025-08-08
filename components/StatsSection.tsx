const StatsSection = () => {
  return (
    <section className=" py-16 border border-black sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-400">
            Our Track Record <span className="text-blue-600">Speaks</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Students Guided */}
          <div className="bg-white  p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl sm:text-5xl text-blue-600 font-bold  mb-2">900+</p>
            <p className="text-blue-600 font-medium">Students Guided</p>
          </div>

          {/* Success Rate */}
          <div className="bg-white  p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl text-blue-600 sm:text-5xl font-bold  mb-2">100%</p>
            <p className=" font-medium text-blue-600">Success Rate</p>
          </div>

          {/* Years Experience */}
          <div className="bg-white  p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl sm:text-5xl text-blue-600 font-bold  mb-2">12+</p>
            <p className=" font-medium text-blue-600">Years Experience</p>
          </div>

          {/* Expert Tutors */}
          <div className="bg-white  p-6 rounded-lg shadow-md text-center">
            <p className="text-4xl text-blue-600 sm:text-5xl font-bold  mb-2">20+</p>
            <p className=" font-medium text-blue-600">Expert Tutors</p>
          </div>
        </div>
      </div>
         
    </section>
  );
};

export default StatsSection;