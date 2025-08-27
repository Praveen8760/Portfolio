import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play carousel every 3s
  useEffect(() => {
    if (!project?.images) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % project.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project]);

  const genieVariants = {
    hidden: {
      scale: isMobile ? 0.5 : 0.2,
      y: isMobile ? 100 : 200,
      opacity: 0,
      filter: "blur(10px)",
      borderRadius: "50%",
    },
    visible: {
      scale: 1,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      borderRadius: "16px",
      transition: {
        duration: isMobile ? 0.4 : 0.7,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
    exit: {
      scale: isMobile ? 0.5 : 0.2,
      y: isMobile ? 100 : 200,
      opacity: 0,
      filter: "blur(10px)",
      borderRadius: "50%",
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl w-full max-w-lg sm:max-w-md p-4 sm:p-6 text-white overflow-auto rounded-2xl max-h-[90vh]"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-2xl"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 text-gray-300 hover:text-white text-xl sm:text-2xl p-2"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold mb-4 tracking-wide drop-shadow-lg">
              {project.title}
            </h2>

            {/* Image Carousel */}
            {project.images?.length > 0 && (
              <div className="relative w-full aspect-[3/2] sm:aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <motion.img
                  key={currentImage}
                  src={project.images[currentImage]}
                  alt={`${project.title} image`}
                  className="w-full h-full object-cover rounded-lg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}

            {/* Description */}
            <p className="text-gray-200 mb-4 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm shadow-sm backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* GitHub */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-medium text-sm sm:text-base"
              >
                🚀 View on GitHub
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
