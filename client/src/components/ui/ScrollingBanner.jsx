
import React from 'react'

function ScrollingBanner() {
  const skills = [
    'CREATIVE DESIGN',
    'UI/UX',
    'MARKETING',
    'MOTION',
    'ANIMATION',
    'BRANDING',
    'DEVELOPMENT',
    'STRATEGY'
  ]

  // Create duplicated content for seamless scrolling
  const scrollingContent = (
    <>
      {skills.map((skill, index) => (
        <span key={index} className="inline-block mx-4 sm:mx-6">
          {skill} <span className="text-orange-500">•</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="relative w-full h-12 sm:h-16  overflow-hidden z-0 pointer-events-none">
      {/* White background strip */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
      
      {/* Scrolling text container */}
      <div className="absolute inset-0 flex items-center">
        <div className="flex animate-scroll whitespace-nowrap text-gray-900 font-semibold text-sm sm:text-base lg:text-lg tracking-wider">
          {/* First set of content */}
          <div className="flex">
            {scrollingContent}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex">
            {scrollingContent}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default ScrollingBanner