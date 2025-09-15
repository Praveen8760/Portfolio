import React, { useEffect, useState } from 'react';
import { ProjectCard } from './ui/ProjectCard';
import projectData from '../data/projects.json'; // Importing JSON

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate fetching but from local JSON
    setProjects(projectData);
  }, []);

  return (
    <section className="relative px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-poppins font-bold mb-8 text-center sm:text-left">
        <span className='text-asset'>P</span>rojects
      </h1>

      {projects.length === 0 ? (
        <p className="text-white text-center sm:text-left">No projects available...</p>
      ) : (
        <>
          {/* Mobile: Horizontal carousel */}
          <div className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none">
            {projects.map(project => (
              <div key={project.id} className="flex-shrink-0 w-72 snap-center">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Tablet/Desktop: Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Project;
