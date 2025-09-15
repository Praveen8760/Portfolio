import { useState } from "react";
import { CometCard } from "../magicui/comet-card";
import ProjectModal from "./ProjectModal";

export function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  if (!project) return null;

  return (
    <>
      <CometCard>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="my-6 sm:my-10 flex w-full max-w-xs sm:max-w-sm md:max-w-md cursor-pointer flex-col items-stretch rounded-2xl border-0 bg-[#1F2121] p-3 sm:p-4 transition-transform hover:scale-[1.02]"
          aria-label={`View project ${project.title}`}
        >
          {/* Image */}
          <div className="flex-1 mx-auto w-full">
            <div className="relative mt-2 aspect-[3/4] w-full rounded-2xl overflow-hidden">
              <img
                loading="lazy"
                className="h-full w-full object-cover"
                alt={project.title}
                src={project.images?.[0]}
              />
            </div>
          </div>

          {/* Title & GitHub */}
          <div className="mt-3 flex flex-col p-3 sm:p-4 font-mono text-white">
            <div className="text-sm sm:text-base font-bold">{project.title}</div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm sm:text-base hover:underline mt-1 truncate"
                onClick={(e) => e.stopPropagation()} // prevent opening modal
              >
                GitHub
              </a>
            )}
          </div>
        </button>
      </CometCard>

      {/* Modal */}
      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  );
}
