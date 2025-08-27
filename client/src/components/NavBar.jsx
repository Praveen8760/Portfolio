

export const NavBar = () => {
  return (
      <div className="relative flex items-center justify-center w-full pt-safe-top px-5 py-3 md:py-5 md:justify-between">
        {/* Left-aligned - Hidden on mobile */}
        <div className="hidden md:inline-flex">
          <span className="font-poppins text-asset font-bold text-3xl">P.</span>
        </div>

        {/* Center-aligned - Always visible, centered on mobile */}
        <div className="md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <span className="font-fairy text-light text-3xl">Praveen</span>
        </div>

        {/* Right-aligned - Hidden on mobile */}
        <div className="hidden md:inline-flex items-center bg-gradient-to-r from-[#FF7E21] to-[#FF9B4D] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md space-x-2 animate-pulse">
          {/* Tick Icon */}
          <svg
            className="w-4 h-4 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>

          <span>Open to Work</span>
        </div>


      </div>

  )
}
