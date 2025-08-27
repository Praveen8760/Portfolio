import { cn } from "../lib/utils";
import React, { useState, useEffect } from "react";

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius, // optional override
  path = true,
  iconSize, // optional override
  speed = 1,
  ...props
}) {
  function calcIconSize() {
    const vw = window.innerWidth;
    // Smaller icons on mobile
    return vw < 640
      ? Math.max(16, Math.min(vw / 15, 40))
      : Math.max(20, Math.min(vw / 20, 50));
  }

  function calcRadius() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const size = iconSize ?? calcIconSize();

    // Safe radius so the icons never go off-screen
    const safeRadius = Math.min(vw, vh) / 2 - size / 2 - 10; // 10px padding

    if (vw < 640) {
      return Math.max(50, safeRadius * 1); // shrink more on mobile
    }

    return Math.max(60, safeRadius); // desktop min radius
  }

  const [size, setSize] = useState({
    radius: radius ?? calcRadius(),
    iconSize: iconSize ?? calcIconSize()
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        radius: radius ?? calcRadius(),
        iconSize: iconSize ?? calcIconSize()
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radius, iconSize]);

  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/20 stroke-1"
            cx="50%"
            cy="50%"
            r={size.radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": calculatedDuration,
              "--radius": size.radius,
              "--angle": angle,
              "--icon-size": `${size.iconSize}px`
            }}
            className={cn(
              `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
