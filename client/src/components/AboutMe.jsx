import React from 'react'
import { TimeLine } from './ui/timeLine'

function AboutMe() {
  return (
    <section className="px-4 md:px-8 lg:px-16 mt-8 md:mt-12 lg:mt-20 flex flex-col justify-center items-center gap-8">
      
      {/* Heading */}
      <h2 className="text-4xl font-poppins sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center">
        About <span className="text-asset">Me</span>
      </h2>

      {/* Description */}
    <p className="w-full font-poppins sm:w-11/12 md:w-3/4 lg:w-2/3 text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed sm:leading-relaxed md:leading-relaxed text-gray-300 px-2 sm:px-4">
      Fueled by curiosity, late-night code sprints, and the occasional dangerously strong coffee, 
      this journey is all about building more than just apps—it's about crafting meaningful digital 
      experiences.
      <br /><br />
      With a foundation in Computer Science and a deep passion for full-stack development, my goal 
      is to turn abstract ideas into smooth, user-friendly solutions. Projects range from 
      <span className="font-semibold text-white"> AI-powered crop disease detection tools </span>
      {' '}to a{' '}
      <span className="font-semibold text-white"> Time Complexity Analyzer VS Code extension </span>
      —each one designed to make tech smarter, faster, and more intuitive.
      <br /><br />
      The current focus? Creating intelligent systems that don't just react, but understand and 
      anticipate. Clean code meets bold thinking—and that's where the magic happens.
    </p>

      {/* Time line */}
      <div className="w-full sm:w-11/12 md:w-full">
        <TimeLine />
      </div>
    </section>
  )
}

export default AboutMe
