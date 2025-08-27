import './App.css'
import AboutMe from './components/AboutMe'
import HeroSection from './components/HeroSection'
import { NavBar } from './components/NavBar'

import { Pointer } from './components/magicui/pointer'



import Skills from './components/Skills'
import Footer from './components/Footer'
import { Dock } from './components/ui/Dock'

import Experience from './components/Experience'
import Project from './components/Project'
import Testimonial from './components/Testimonial'


const defaultSpringConfig = {
  damping: 35,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};


function App() {
  return (
    <div className="bg-dark text-light overflow-hidden">  
      {/* <Pointer/> */}
      <NavBar />
      <HeroSection />
      <AboutMe />
      <Skills/>

      <Experience/>

      <Project/>

      <Testimonial/>

     
      <Footer/>

      <Dock/>
    </div>
  )
}

export default App
