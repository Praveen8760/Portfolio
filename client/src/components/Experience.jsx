import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Spline from '@splinetool/react-spline';

import microsoft from "../assets/icon/microsoft_club_sathyabama_logo.jpeg";
import hcllogo from "../assets/icon/hcl.jpeg";

import steps from "../assets/icon/steps.svg"

export default function ExperienceGrid() {
  const experiences = [
    {
      id: 1,
      title: "Project Intern",
      company: "HCLTech",
      logo: hcllogo,
      from: "Aug 2023",
      to: "Oct 2023",
      details:
        "Built responsive UI components, improved accessibility, and reduced bundle size by 18%. Worked with React, Tailwind and improved app performance."
    },
    {
      id: 2,
      title: "Design Team Lead",
      company: "Microsoft Club - SIST",
      logo: microsoft,
      from: "Jul 2023",
      to: "Aug 2024",
      details:
        "Developed REST APIs using Express, integrated MongoDB, and implemented real-time features using Socket.io. Led frontend integration using React and Tailwind."
    }
  ];

  const [expandedId, setExpandedId] = useState(null);
  const rightColRef = useRef(null);
  const isRightInView = useInView(rightColRef, { once: true, margin: "-50px" });

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 flex flex-col">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8">
        <span className="text-asset">E</span>xperience
      </h2>

      {/* Grid: left 3D element / right cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto flex-1 md:items-center">
        
        {/* LEFT: Spline 3D Element */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0 md:h-[600px]">
          <div className="w-full h-full">
            <img src={steps}></img>
          </div>
        </div>

        {/* RIGHT: Experience cards */}
        <div
          ref={rightColRef}
          className="space-y-6 md:max-h-[70vh] md:overflow-y-auto pr-0 md:pr-2"
          style={{ scrollbarWidth: "thin" }}
        >
          {experiences.map((exp, idx) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: true, margin: "-50px" });

            return (
              <motion.article
                ref={cardRef}
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isRightInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
              >
                <div
                  className="relative p-4 sm:p-5 rounded-xl border border-white/10 card cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => toggleCard(exp.id)}
                >
                  {/* Connecting line for desktop only */}
                  {idx < experiences.length - 1 && (
                    <motion.svg
                      className="absolute left-6 top-full w-px hidden md:block"
                      height="40"
                      viewBox="0 0 1 40"
                      preserveAspectRatio="none"
                      initial={{ pathLength: 0 }}
                      animate={isCardInView ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{
                        duration: 1,
                        ease: [0.19, 1, 0.22, 1],
                        delay: idx * 0.12 + 0.2
                      }}
                    >
                      <motion.line
                        x1="0.5"
                        y1="0"
                        x2="0.5"
                        y2="40"
                        stroke="#FF7E21"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </motion.svg>
                  )}

                  <div className="flex items-start gap-4">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0 shadow-md"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {exp.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/70">
                            {exp.company}
                          </p>
                        </div>

                        <div className="text-xs sm:text-sm text-white/60">
                          {exp.from} — {exp.to}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expandedId === exp.id && (
                          <motion.p
                            className="mt-3 text-xs sm:text-sm text-white/80 leading-relaxed"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                          >
                            {exp.details}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .card {
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          background-color: rgba(30, 35, 35, 0.75);
        }

        /* Scrollbar styling for right column on desktop */
        div[ref]::-webkit-scrollbar {
          width: 6px;
        }
        div[ref]::-webkit-scrollbar-thumb {
          background-color: #ff7e21;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}