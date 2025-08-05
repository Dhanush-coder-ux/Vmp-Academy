'use client'

import Count from './Count'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  useGSAP(() => {
    gsap.fromTo(
      'h1',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: 'power2.inOut' }
    )
  })

  return (
    <div className='max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-20 sm:py-24'>
      <div className='text-center'>
        <h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>
          Welcome to <br /> 
          <span className='text-blue-600'>VMP Academy</span>
        </h1>
        <p className='mt-6 text-lg text-gray-300 max-w-2xl mx-auto'>
          Empowering students through personalized education.  
          Quality tuition, expert guidance, and proven results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
         
          <a
            href="#contact"
            type="button"
            //  onClick={() => router.push('/entrollment')}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 rounded-lg shadow-lg shadow-cyan-500/50 transition-all hover:shadow-xl"
          >
            Contact Us
            <img src="/icons/contact.svg" height={25} width={25} alt="Enroll" />
          </a>
          
          
          {/* <button 
            type="button" 
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 rounded-lg shadow-lg shadow-teal-500/50 transition-all hover:shadow-xl"
          >
            Book Free Trial
          </button> */}
          {/* <Link href={'/admin/dashboard'} className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 rounded-lg shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl">
            Admin Dashboard
            <img src="/icons/clock.svg" height={20} width={20} alt="Dashboard" />
          </Link> */}
        
        </div>
      </div>
      
     <div className="mt-16 w-full flex justify-center">
  <Count />
</div>
    </div>
  );
};

export default Hero;