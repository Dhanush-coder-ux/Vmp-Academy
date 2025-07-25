

import ActivityFeed from "@/components/ActivityFeed";


const About = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className='relative flex flex-col w-full justify-center py-20 sm:py-16'>
        {/* Mission & Vision Header */}
        <div className='text-center mb-16 max-w-4xl mx-auto'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.2]'>
            Our Mission <span className='text-blue-600'>& Vision</span>
          </h1>
          <p className='mt-6 text-lg text-gray-600'>
            VMP Academy was founded with a simple goal: to make quality education accessible. We provide structured learning environments to help students reach their full potential.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16 max-w-6xl mx-auto">
          <div className="flex items-start flex-1 space-x-4">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-full flex-shrink-0">
              <img src="/icons/goal.svg" height={24} width={24} alt="Mission icon" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-green-400">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional educational support through personalized tutoring,
                innovative teaching methods, and a commitment to academic excellence
                that empowers every student to achieve their goals.
              </p>
            </div>
          </div>

          <div className="flex items-start flex-1 space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full flex-shrink-0">
              <img src="/icons/eye.svg" height={24} width={24} alt="Vision icon" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-pink-400">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading educational academy that transforms lives through
                quality education, fostering critical thinking, creativity, and
                confidence in every student we serve.
              </p>
            </div>
          </div>
        </div>
            
        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          <div className="block p-6  bg-gray-900 border border-gray-800 rounded-lg shadow-s transition-colors">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icons/heart.svg" height={20} width={20} alt="Passionate Teaching" />
            </div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">Passionate Teaching</h5>
            <p className="font-normal text-gray-700">Our educators are passionate about student success</p>
          </div>
          
          <div className="block p-6  bg-gray-900 border border-gray-800 rounded-lg shadow-sm  transition-colors">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icons/goal.svg" height={20} width={20} alt="Goal-Oriented" />
            </div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">Goal-Oriented</h5>
            <p className="font-normal text-gray-700">Focused approach to achieve academic targets</p>
          </div>
          
          <div className="block p-6  bg-gray-900 border border-gray-800 rounded-lg shadow-sm  transition-colors">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icons/bulb.svg" height={20} width={20} alt="Innovative Methods" />
            </div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">Innovative Methods</h5>
            <p className="font-normal text-gray-700">Cutting-edge teaching techniques for better learning</p>
          </div>
          
          <div className="block p-6  bg-gray-900 border border-gray-800 rounded-lg shadow-sm  transition-colors">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 rounded-full w-10 h-10 flex items-center justify-center mb-4">
              <img src="/icons/eye.svg" height={20} width={20} alt="Individual Focus" />
            </div>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-white">Individual Focus</h5>
            <p className="font-normal text-gray-700">Personalized attention for every student</p>
          </div>
        </div>

        {/* What Makes Us Different Section */}
        <div className="max-w-4xl mx-auto p-8 bg-gray-900 border border-gray-800 rounded-lg shadow-sm  transition-colors">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">What Makes Us Different</h2>
          <p className="text-gray-600 text-center text-lg">
            Our experienced educators focus on critical thinking, problem-solving, and confidence-building—because learning goes beyond textbooks. We create an environment where students thrive academically and personally.
          </p>
        </div>
        
        <ActivityFeed />
      </div>
    </div>
  );
}

export default About;