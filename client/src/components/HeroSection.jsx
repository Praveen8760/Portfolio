import React from 'react';
import { FiDownload } from 'react-icons/fi'; 


// Scrolling Banner Component
function ScrollingBanner() {
  const skills = [
    'Full-Stack Development',
    'UI/UX Design',
    'Data Structures & Algorithms',
    'Problem Solving',
    'Version Control',
    'API Development',
    'Database Design',
    'Team Player'
  ];

  const scrollingContent = (
    <>
      {skills.map((skill, index) => (
        <span key={index} className="inline-block mx-8 sm:mx-12">
          {skill} <span className="text-orange-500 text-lg">•</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="absolute md:-bottom-52 bottom-0 left-0 w-[200vw] h-16 sm:h-20 rotate-[-15deg] origin-left overflow-hidden z-50 pointer-events-none transform -translate-x-[30%] sm:translate-y-[100%] translate-y-0">
      <div className="absolute inset-0 bg-white shadow-lg" />
      <div className="absolute inset-0 flex items-center">
        <div className="flex animate-scroll-left whitespace-nowrap text-gray-800 font-medium text-base sm:text-lg tracking-wide">
          <div className="flex">{scrollingContent}</div>
          <div className="flex">{scrollingContent}</div>
          <div className="flex">{scrollingContent}</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative max-w-dvh min-h-dvh flex flex-row justify-start md:justify-start items-center px-4 md:px-0 -translate-y-12 md:translate-y-0">
      
      <div className='z-0 flex justify-center md:justify-start w-full md:w-auto top-0'>
        <h3
          className='text-transparent -left-1/2 text-[700px] sm:text-[200px] lg:text-[800px] font-poppins leading-none select-none' 
          style={{WebkitTextStroke: '1px rgba(255,255,255,0.2)'}}
        >
          P
        </h3>
      </div>

      {/* Text content */}
      <div className='absolute z-10 font-poppins lg:left-18 flex flex-col gap-4'>
        <p className='text-[40px] sm:text-4xl lg:text-[80px] leading-tight mb-1 md:mb-0'>
          Full stack Dev,
        </p>
        <p className='text-[30px] sm:text-3xl lg:text-[80px] leading-tight mb-1 md:mb-0'>
          Software Developer
        </p>
        <p className='text-[25px] sm:text-4xl lg:text-[80px] leading-tight'>
          <span className='text-asset'>&</span> More
        </p>

        {/* Download Resume Button with icon */}
        <a
          href="https://drive.google.com/uc?export=download&id=1Ajvk_0HThtboY2GPpH85RTFjlpZfgwYk"  target='_blank' rel="noopener noreferrer"
          download
          className="mt-3 w-fit sm:mt-4 inline-flex items-center gap-2 px-8 sm:px-5 md:px-6 py-2 sm:py-3 bg-asset text-white font-semibold rounded-lg shadow-lg hover:bg-asset/90 transition-colors duration-300 text-sm sm:text-base md:text-base"
        >
          <FiDownload className="w-4 h-8 sm:w-5 sm:h-5 md:w-5 md:h-5" />
          Download Resume
        </a>
      </div>

      {/* Diagonal Scrolling Banner */}
      <ScrollingBanner/>
      
    </div>
  );
}


export default HeroSection;
