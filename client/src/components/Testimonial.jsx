/* eslint-disable @next/next/no-img-element */
import { cn } from "./lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Rokith S V",
    username: "@rokith",
    body: "Praveen is an amazing developer! His projects are always top-notch and innovative.",
    img: "https://avatar.vercel.sh/rokith",
  },
  {
    name: "Ram Kumar",
    username: "@ramkumar",
    body: "I’ve worked with Praveen on several projects, and he always goes above and beyond. Truly talented!",
    img: "https://avatar.vercel.sh/ramkumar",
  },
  {
    name: "Ramesh G",
    username: "@ramesh",
    body: "Praveen’s problem-solving skills are exceptional. He’s a great friend and an inspiring coder.",
    img: "https://avatar.vercel.sh/ramesh",
  },
  {
    name: "Rakkesh G",
    username: "@rakkesh",
    body: "Working with Praveen has been fantastic. His attention to detail and dedication are unmatched.",
    img: "https://avatar.vercel.sh/rakkesh",
  },
  {
    name: "Jack",
    username: "@jack",
    body: "Praveen always delivers high-quality work and is someone you can rely on. Highly recommend collaborating with him!",
    img: "https://avatar.vercel.sh/jack",
  },
];


const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({ img, name, username, body }) => (
  <figure
    className={cn(
      "relative h-full w-full sm:w-36 md:w-40 lg:w-44 cursor-pointer overflow-hidden rounded-xl border p-3 sm:p-4",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "border-gray-50/[.1] bg-gray-50/[.10] hover:bg-gray-50/[.15]",
      "min-w-[280px] sm:min-w-[320px] md:min-w-0" // Ensure minimum width on mobile
    )}
  >
    <div className="flex items-center gap-2 sm:gap-3">
      <img 
        className="rounded-full flex-shrink-0" 
        width="28" 
        height="28" 
        alt={name} 
        src={img}
        style={{ width: "28px", height: "28px" }} // Force size on mobile
      />
      <div className="flex flex-col min-w-0 flex-1">
        <figcaption className="text-xs sm:text-sm font-medium text-white truncate">
          {name}
        </figcaption>
        
      </div>
    </div>
    <blockquote className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3">
      {body}
    </blockquote>
  </figure>
);

export const Marquee3D = () => (
  <section className="relative py-8 sm:py-12 lg:py-16 bg-dark overflow-hidden">
    <div className="container mx-auto px-4 text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
        What Friends <span className="text-asset">&</span> Colleagues Say
      </h2>
      <p className="text-sm sm:text-base text-muted mt-2 max-w-2xl mx-auto">
        Honest feedback from those who know us best
      </p>
    </div>

    {/* Mobile Layout - 2 columns with 3D effect */}
    <div className="block sm:hidden">
      <div className="relative flex h-64 w-full items-center justify-center gap-3 overflow-hidden [perspective:250px]">
        <div
          className="flex flex-row items-center gap-3"
          style={{
            transform: "translateX(-40px) translateY(0px) translateZ(-60px) rotateX(15deg) rotateY(-8deg) rotateZ(15deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:18s]">
            {firstRow.map((review) => (
              <div key={review.username} className="mb-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:18s]">
            {secondRow.map((review) => (
              <div key={review.username} className="mb-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Mobile fade overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-black"></div>
      </div>
    </div>

    {/* Tablet Layout - 3 columns with 3D effect */}
    <div className="hidden sm:block lg:hidden">
      <div className="relative flex h-80 w-full items-center justify-center gap-3 overflow-hidden [perspective:280px]">
        <div
          className="flex flex-row items-center gap-3"
          style={{
            transform: "translateX(-60px) translateY(0px) translateZ(-80px) rotateX(18deg) rotateY(-8deg) rotateZ(18deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <div key={review.username} className="mb-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
              <div key={review.username} className="mb-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <div key={review.username} className="mb-3">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Tablet fade overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black"></div>
      </div>
    </div>

    {/* Desktop Layout - Full 3D effect */}
    <div className="hidden lg:block">
      <div className="relative flex h-96 w-full items-center justify-center gap-4 overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform: "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <div key={review.username} className="mb-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
              <div key={review.username} className="mb-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <div key={review.username} className="mb-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>

          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
              <div key={review.username} className="mb-4">
                <ReviewCard {...review} />
              </div>
            ))}
          </Marquee>
        </div>

        {/* Desktop fade overlays */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
      </div>
    </div>
  </section>
);

export default Marquee3D;