import React, { useEffect, useState } from 'react';
import { ProjectCard } from './ui/ProjectCard';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const q = query(collection(db, "Projects"));
        const snapshot = await getDocs(q);
        const projectData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <section className="relative px-4 sm:px-6 lg:px-12 py-8">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-poppins font-bold mb-8 text-center sm:text-left">
        <span className='text-asset'>P</span>rojects
      </h1>

      {loading ? (
        <p className="text-white text-center sm:text-left">Loading projects...</p>
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
