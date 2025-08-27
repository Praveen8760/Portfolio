import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

const imagePaths = Array.from({ length: 12 }, (_, i) => `/assets/media/${String(i + 1).padStart(2, "0")}.svg`);


const MwgEffect = () => {
  const rootRef = useRef(null);
  const oldX = useRef(0);
  const oldY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);

  useEffect(() => {
    const root = rootRef.current;

    const handleMouseMove = (e) => {
      deltaX.current = e.clientX - oldX.current;
      deltaY.current = e.clientY - oldY.current;
      oldX.current = e.clientX;
      oldY.current = e.clientY;
    };

    root.addEventListener("mousemove", handleMouseMove);

    const mediaElements = root.querySelectorAll(".media");

    mediaElements.forEach((el) => {
      const img = el.querySelector("img");

      el.addEventListener("mouseenter", () => {
        const tl = gsap.timeline({
          onComplete: () => tl.kill(),
        });

        tl.timeScale(1.2);
        tl.to(img, {
          inertia: {
            x: {
              velocity: deltaX.current * 30,
              end: 0,
            },
            y: {
              velocity: deltaY.current * 30,
              end: 0,
            },
          },
        });
        tl.fromTo(
          img,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      });
    });

    return () => {
      root.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative h-screen grid place-items-center overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 w-full border-b border-neutral-700 p-5 text-neutral-300 flex justify-between items-center flex-wrap gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-0">
        <div className="text-lg sm:text-2xl">Skills</div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-20 px-4 sm:px-0">
        {imagePaths.map((src, index) => (
          <div className="media" key={index}>
            <img
              src={src}
              alt={`media-${index + 1}`}
              className="w-[10vw] sm:w-[8vw] aspect-square object-contain rounded-md pointer-events-none will-change-transform"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MwgEffect;
