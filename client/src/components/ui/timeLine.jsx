import { ArcTimeline } from "../magicui/arc-timeline";
import {
  RocketIcon,
  CubeIcon,
  LockClosedIcon,
  GlobeIcon,
  GearIcon,
  LightningBoltIcon,
  StarIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";

export function TimeLine() {
  return (
    <ArcTimeline
      data={TIMELINE}
      defaultActiveStep={{ time: "2025", stepIndex: 0 }}
      arcConfig={{
        circleWidth: 4500,
        angleBetweenMinorSteps: 0.4,
        lineCountFillBetweenSteps: 8,
        boundaryPlaceholderLinesCount: 50,
      }}
    />
  );
}

const TIMELINE = [
  {
    time: "2022",
    steps: [
      {
        icon: <RocketIcon width={20} height={20} />,
        content: "Started B.Tech in Computer Science & Engineering at Satyabama Institute of Science and Technology.",
      },
      {
        icon: <CubeIcon width={20} height={20} />,
        content: "Built my first portfolio website and experimented with HTML, CSS, and JavaScript.",
      },
    ],
  },
  {
    time: "2023",
    steps: [
      {
        icon: <GearIcon width={20} height={20} />,
        content: "Developed skills in React.js, Node.js, and Tailwind CSS.",
      },
      {
        icon: <GlobeIcon width={20} height={20} />,
        content: "Joined Microsoft Club - SIST as Design Team Lead, managing design and development tasks for club projects.",
      },
      {
        icon: <LockClosedIcon width={20} height={20} />,
        content: "Completed internship at HCLTech, building responsive UI components and optimizing web applications.",
      },
    ],
  },
  {
    time: "2024",
    steps: [
      {
        icon: <MagicWandIcon width={20} height={20} />,
        content: "Worked on full-stack projects including a real-time auction system and an AI-based agriculture system.",
      },
      {
        icon: <RocketIcon width={20} height={20} />,
        content: "Enhanced backend skills using Express, MongoDB, and real-time technologies like Socket.io.",
      },
      {
        icon: <StarIcon width={20} height={20} />,
        content: "Focused on data structures, algorithms, and problem-solving for placement preparation.",
      },
    ],
  },
  {
    time: "2025",
    steps: [
      {
        icon: <LightningBoltIcon width={20} height={20} />,
        content: "Preparing for SDE roles in top tech companies with hands-on practice in DSA, system design, and competitive coding.",
      },
      {
        icon: <CubeIcon width={20} height={20} />,
        content: "Building VersionMind, an AI-powered code knowledge base, demonstrating scalable full-stack architecture.",
      },
      {
        icon: <GlobeIcon width={20} height={20} />,
        content: "Contributing to open-source projects and refining backend and frontend skills for industry readiness.",
      },
    ],
  },
  {
    time: "Future Goals",
    steps: [
      {
        icon: <GearIcon width={20} height={20} />,
        content: "Secure a Software Development Engineer (SDE) role in a top tech company.",
      },
      {
        icon: <StarIcon width={20} height={20} />,
        content: "Develop scalable and high-performance web applications and backend systems.",
      },
      {
        icon: <MagicWandIcon width={20} height={20} />,
        content: "Continuously improve coding, system design, and problem-solving skills to excel as an SDE.",
      },
    ],
  },
];
