"use client";
import { useState, useRef } from "react";

// Utility function to combine classNames (simplified version)
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Mobile vibration utility
function triggerVibration() {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    // Short vibration pattern: vibrate for 50ms
    navigator.vibrate(50);
  }
}

export function ArcTimeline(props) {
  const {
    className,
    data,
    arcConfig = {},
    defaultActiveStep = {},
    ...restProps
  } = props;

  const {
    circleWidth = 5000,
    angleBetweenMinorSteps = 0.35,
    lineCountFillBetweenSteps = 10,
    boundaryPlaceholderLinesCount = 50,
  } = arcConfig;

  const {
    time: defaultActiveTime = data[0].time,
    stepIndex: defaultActiveStepIndex = 0,
  } = defaultActiveStep || {};

  const [circleContainerRotateDeg, setCircleContainerRotateDeg] = useState(() => {
    let count = 0;
    for (const timelineItem of data) {
      if (timelineItem.time === defaultActiveTime) {
        count += defaultActiveStepIndex;
        break;
      } else {
        count += timelineItem.steps.length;
      }
    }
    return (
      -1 * count * angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) -
      angleBetweenMinorSteps * boundaryPlaceholderLinesCount
    );
  });

  const rotationRef = useRef(circleContainerRotateDeg);
  rotationRef.current = circleContainerRotateDeg;

  // Touch/swipe state
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    let count = 0;
    for (const timelineItem of data) {
      if (timelineItem.time === defaultActiveTime) {
        count += defaultActiveStepIndex;
        break;
      } else {
        count += timelineItem.steps.length;
      }
    }
    return count;
  });

  // Get all steps as flat array for navigation
  const allSteps = data.flatMap((line, lineIndex) => 
    line.steps.map((step, stepIndex) => ({
      ...step,
      time: line.time,
      lineIndex,
      stepIndex,
      globalIndex: data.slice(0, lineIndex).reduce((acc, item) => acc + item.steps.length, 0) + stepIndex
    }))
  );

  // Device detection
  const isMobile = () => typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Touch/Mouse handlers for swipe navigation (works on both mobile and desktop)
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  // Touch handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent scrolling
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - startX.current;
    const deltaY = touchEndY - startY.current;
    
    handleSwipeNavigation(deltaX, deltaY);
    isDragging.current = false;
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    
    const mouseEndX = e.clientX;
    const mouseEndY = e.clientY;
    const deltaX = mouseEndX - startX.current;
    const deltaY = mouseEndY - startY.current;
    
    handleSwipeNavigation(deltaX, deltaY);
    isDragging.current = false;
  };

  const handleSwipeNavigation = (deltaX, deltaY) => {
    // Only trigger if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0 && currentStepIndex > 0) {
        // Swipe right - go to previous step
        const newIndex = currentStepIndex - 1;
        setCurrentStepIndex(newIndex);
        navigateToStep(newIndex);
      } else if (deltaX < 0 && currentStepIndex < allSteps.length - 1) {
        // Swipe left - go to next step
        const newIndex = currentStepIndex + 1;
        setCurrentStepIndex(newIndex);
        navigateToStep(newIndex);
      }
    }
  };

  const navigateToStep = (stepIndex) => {
    const targetAngle = -1 * (
      stepIndex * angleBetweenMinorSteps * (lineCountFillBetweenSteps + 1) +
      angleBetweenMinorSteps * boundaryPlaceholderLinesCount
    );
    smoothRotate(targetAngle);
  };

  const smoothRotate = (targetAngle) => {
    // Trigger vibration on timeline movement
    triggerVibration();
    
    // More aggressive mobile optimization
    const isMobileDevice = isMobile();
    const duration = isMobileDevice ? 250 : 600; // Much shorter duration on mobile
    
    const start = rotationRef.current;
    const change = targetAngle - start;
    const startTime = performance.now();

    let animationId;

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ultra-light easing for mobile
      const eased = isMobileDevice 
        ? progress // Linear easing (fastest computation)
        : progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCircleContainerRotateDeg(start + change * eased);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    
    // Cleanup function to cancel animation if needed
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  };

  const handleStepClick = (angle, globalIndex) => {
    setCurrentStepIndex(globalIndex);
    smoothRotate(-1 * angle);
  };

  return (
    <div
      {...restProps}
      className={cn("relative h-[380px] w-full overflow-hidden select-none", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ touchAction: 'pan-y pinch-zoom' }} // Allow vertical scroll but handle horizontal
    >
      <div
        style={{
          transform: `translateX(-50%) rotate(${circleContainerRotateDeg}deg)`,
          width: `${circleWidth}px`,
          willChange: 'transform', // Optimize for animations
        }}
        className="absolute left-1/2 top-28 aspect-square origin-center rounded-full"
      >
        {data.map((line, lineIndex) => {
          return (
            <div key={`${lineIndex}`}>
              {line.steps.map((step, stepIndex) => {
                const angle =
                  angleBetweenMinorSteps *
                    (lineCountFillBetweenSteps + 1) *
                    (data
                      .slice(0, lineIndex)
                      .map((item) => item.steps.length)
                      .reduce((prev, current) => prev + current, 0) +
                      stepIndex) +
                  angleBetweenMinorSteps * boundaryPlaceholderLinesCount;

                const isLastStep =
                  lineIndex === data.length - 1 &&
                  stepIndex === line.steps.length - 1;
                const isFirstStep = lineIndex === 0 && stepIndex === 0;
                const isActive =
                  Math.abs(angle + circleContainerRotateDeg) < 0.01;

                return (
                  <div key={`${lineIndex}-${stepIndex}`}>
                    {isFirstStep && (
                      <PlaceholderLines
                        isFirstStep
                        isLastStep={false}
                        angle={angle}
                        angleBetweenMinorSteps={angleBetweenMinorSteps}
                        lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                        boundaryPlaceholderLinesCount={
                          boundaryPlaceholderLinesCount
                        }
                        lineIndex={lineIndex}
                        stepIndex={stepIndex}
                        circleWidth={circleWidth}
                        circleContainerRotateDeg={circleContainerRotateDeg}
                      />
                    )}
                    <div
                      className={cn(
                        "absolute left-1/2 top-0 -translate-x-1/2 cursor-pointer",
                        isActive ? "h-[120px] w-[2px]" : "h-16 w-[1.5px]"
                      )}
                      style={{
                        transformOrigin: `50% ${circleWidth / 2}px`,
                        transform: `rotate(${angle}deg)`,
                        willChange: 'transform', // Optimize for transforms
                      }}
                      onClick={() => handleStepClick(angle, data
                        .slice(0, lineIndex)
                        .map((item) => item.steps.length)
                        .reduce((prev, current) => prev + current, 0) + stepIndex)}
                    >
                      <div
                        className={cn(
                          "h-full w-full transition-colors duration-200",
                          isActive
                            ? "bg-[var(--step-line-active-color,#FF7E21)]"
                            : "bg-[var(--step-line-inactive-color,#b1b1b1)]"
                        )}
                        style={{
                          transformOrigin: "center top",
                          transform: `rotate(${
                            -1 * angle - circleContainerRotateDeg
                          }deg)`,
                          willChange: 'transform', // Optimize for transforms
                        }}
                      >
                        <div
                          className={cn(
                            "absolute bottom-0 left-1/2 aspect-square -translate-x-1/2",
                            isActive
                              ? "translate-y-[calc(100%_+_14px)] scale-[1.2] text-[var(--icon-active-color,#fafafa)]"
                              : "translate-y-[calc(100%_+_4px)] scale-100 text-[var(--icon-inactive-color,#a3a3a3)]"
                          )}
                        >
                          {step.icon}
                        </div>
                        <p
                          className={cn(
                            "absolute bottom-0 left-1/2 line-clamp-3 flex w-[240px] -translate-x-1/2 translate-y-[calc(100%_+_42px)] items-center justify-center text-center text-sm transition-opacity duration-300 ease-in",
                            "text-[var(--description-color,#fafafa)]",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        >
                          {step.content}
                        </p>
                      </div>
                      {stepIndex === 0 && (
                        <div
                          className={cn(
                            "absolute left-1/2 top-0 z-10 font-poppins -translate-x-1/2 translate-y-[calc(-100%-24px)] whitespace-nowrap",
                            isActive
                              ? "text-[var(--time-active-color,#FF7E21)]"
                              : "text-[var(--time-inactive-color,#a3a3a3)]"
                          )}
                        >
                          {line.time}
                        </div>
                      )}
                    </div>
                    <PlaceholderLines
                      isFirstStep={false}
                      isLastStep={isLastStep}
                      angle={angle}
                      angleBetweenMinorSteps={angleBetweenMinorSteps}
                      lineCountFillBetweenSteps={lineCountFillBetweenSteps}
                      boundaryPlaceholderLinesCount={
                        boundaryPlaceholderLinesCount
                      }
                      lineIndex={lineIndex}
                      stepIndex={stepIndex}
                      circleWidth={circleWidth}
                      circleContainerRotateDeg={circleContainerRotateDeg}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlaceholderLines({
  isFirstStep,
  isLastStep,
  angle,
  angleBetweenMinorSteps,
  lineCountFillBetweenSteps,
  boundaryPlaceholderLinesCount,
  lineIndex,
  stepIndex,
  circleWidth,
  circleContainerRotateDeg,
}) {
  const getAngle = (index) => {
    if (isFirstStep) {
      return index * angleBetweenMinorSteps;
    } else {
      return angle + (index + 1) * angleBetweenMinorSteps;
    }
  };

  return (
    <>
      {Array(
        isLastStep || isFirstStep
          ? boundaryPlaceholderLinesCount
          : lineCountFillBetweenSteps
      )
        .fill("")
        .map((_, fillIndex) => {
          const fillAngle = getAngle(fillIndex);
          return (
            <div
              key={`${lineIndex}-${stepIndex}-${fillIndex}`}
              className="absolute left-1/2 top-0 h-[34px] w-[1px] -translate-x-1/2"
              style={{
                transformOrigin: `50% ${circleWidth / 2}px`,
                transform: `rotate(${fillAngle}deg)`,
              }}
            >
              <div
                className="h-full w-full bg-[var(--placeholder-line-color,#a1a1a1)]"
                style={{
                  transformOrigin: "center top",
                  transform: `rotate(${
                    -1 * fillAngle - circleContainerRotateDeg
                  }deg)`,
                }}
              ></div>
            </div>
          );
        })}
    </>
  );
}

// Demo component with sample data
function TimelineDemo() {
  const timelineData = [
    {
      time: "2020",
      steps: [
        {
          icon: "🎓",
          content: "Started Computer Science Journey"
        },
        {
          icon: "💻",
          content: "First Programming Course"
        }
      ]
    },
    {
      time: "2021", 
      steps: [
        {
          icon: "🚀",
          content: "Built First Web Application"
        },
        {
          icon: "⚛️",
          content: "Learned React & Modern JS"
        }
      ]
    },
    {
      time: "2022",
      steps: [
        {
          icon: "🌱",
          content: "AI Crop Disease Detection"
        },
        {
          icon: "🔧",
          content: "VS Code Extension Development"
        }
      ]
    },
    {
      time: "2023",
      steps: [
        {
          icon: "🏆",
          content: "Full-Stack Developer Role"
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-gray-900 text-white p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Career Timeline</h2>
      <ArcTimeline data={timelineData} />
      <p className="text-center text-sm text-gray-400 mt-4">
        Swipe or drag left/right to navigate • Click on timeline points • Mobile devices vibrate on navigation
      </p>
    </div>
  );
}

export default TimelineDemo;