"use client";
import React, { useEffect, useRef, useState } from "react";

// Use RGBA for balloon colors with alpha for transparency
const BALLOON_COLORS = [
  "rgba(253,57,122,0.28)",
  "rgba(251,192,45,0.22)",
  "rgba(171,135,234,0.25)",
  "rgba(129,212,250,0.22)",
  "rgba(229,115,115,0.26)",
  "rgba(255,183,77,0.21)",
  "rgba(174,213,129,0.20)",
  "rgba(240,98,146,0.28)",
];

const BALLOON_COUNT = 16;
const MIN_SIZE = 36;
const MAX_SIZE = 68;

function getRandomInt(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Deterministic balloon creation for in-order and spread positions.
// Every balloon always lands at the same position and seed.
function createBalloon(id) {
  // To keep their order, let's space them horizontally (evenly distributed, but random within chunks)
  const chunk = Math.floor(90 / BALLOON_COUNT);
  const x = 5 + chunk * (id - 1) + getRandomInt(0, Math.max(1, chunk - 8)); // % from left
  const y = -100; // balloons start just below the fold
  const size = getRandomInt(MIN_SIZE, MAX_SIZE);
  const color = BALLOON_COLORS[(id - 1) % BALLOON_COLORS.length]; // Always assign color in order
  const blur = Math.random() < 0.11 ? getRandomInt(1, 5) : 0;
  const risingSpeed = getRandomInt(15, 28);
  return {
    id,
    x,
    y,
    size,
    color,
    blur,
    risingSpeed,
    appeared: false, // Used for staged appearance
  };
}

const FirstPage = () => {
  // Balloons are staged into visibility one after another
  const [balloons, setBalloons] = useState(() =>
    Array.from({ length: BALLOON_COUNT }, (_, i) => createBalloon(i + 1))
  );
  const [shownCount, setShownCount] = useState(0);

  const animationRef = useRef();
  const stagingRef = useRef();

  // Staggered showing of balloons
  useEffect(() => {
    let i = 0;
    stagingRef.current = setInterval(() => {
      setShownCount((prev) => {
        if (prev < BALLOON_COUNT) {
          return prev + 1;
        } else {
          clearInterval(stagingRef.current);
          return prev;
        }
      });
      i++;
    }, 350); // each balloon enters every 350ms in order
    return () => clearInterval(stagingRef.current);
  }, []);

  useEffect(() => {
    animationRef.current = setInterval(() => {
      setBalloons((prevBalloons) =>
        prevBalloons.map((b, idx) => {
          // Only animate if the balloon is revealed for user
          if (idx < shownCount) {
            // If above screen, respawn at bottom with new 'tail'
            if (b.y > window.innerHeight + 70) {
              // create a balloon with same id, keeping its order & color
              const newBalloon = createBalloon(b.id);
              return {
                ...newBalloon,
                x: b.x, // keep x position fixed in order
                color: b.color, // keep color fixed to sequence
                appeared: true,
              };
            }
            // Otherwise, animate upward
            return { ...b, y: b.y + b.risingSpeed * 0.09, appeared: true };
          } else {
            return b;
          }
        })
      );
    }, 44);
    return () => {
      clearInterval(animationRef.current);
    };
  }, [shownCount]);

  return (
    <div
      style={{
        color: "black",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        backgroundImage: 'url("/first.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="your-text-class"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        HAPPY VALENTINE&apos;S DAY
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
          .your-text-class {
            font-family: 'Staatliches', cursive, sans-serif;
            color: #c2185b; /* dark pink */
            font-size: 4rem;
            letter-spacing: 2.22px;
            font-weight: 700;
            text-transform: uppercase;
            text-shadow: 0 2px 4px rgba(34,34,34,0.15);
          }
        `}
      </style>
      <div
        style={{
          position: "absolute",
          right: "30px",
          bottom: "30px",
          textAlign: "right",
          fontFamily: "'Staatliches', cursive, sans-serif",
          fontSize: "1.5rem",
          color: "#c2185b",
          maxWidth: "300px",
          zIndex: 10,
          letterSpacing: "0.05em",
        }}
      >
        <br />
        <span
          style={{
            fontWeight: 600,
            fontSize: "2rem",
            color: "#c2185b",
            fontFamily: "cursive",
          }}
        >
          ~From: Vamsi Ram
        </span>
      </div>
      {/* Balloon animation and rendering */}
      {balloons.map((balloon, idx) =>
        idx < shownCount ? (
          <div
            key={balloon.id}
            style={{
              position: "absolute",
              left: balloon.x + "%",
              bottom: `${balloon.y}px`,
              width: balloon.size + "px",
              height: balloon.size * 1.4 + "px",
              pointerEvents: "none",
              zIndex: 2,
              opacity: 0.8,
              transition: "filter 0.3s",
              filter: `blur(${balloon.blur}px)`,
            }}
          >
            <svg
              width={balloon.size}
              height={balloon.size * 1.4}
              style={{
                display: "block",
              }}
            >
              {/* Balloon body (ellipse) */}
              <ellipse
                cx={balloon.size / 2}
                cy={balloon.size * 0.6}
                rx={balloon.size / 2}
                ry={balloon.size * 0.6}
                fill={balloon.color}
                fillOpacity="0.98"
              />
              {/* Balloon shine */}
              <ellipse
                cx={balloon.size * 0.38}
                cy={balloon.size * 0.45}
                rx={balloon.size * 0.14}
                ry={balloon.size * 0.19}
                fill="#fff"
                fillOpacity="0.23"
              />
              {/* String */}
              <path
                d={`
                  M ${balloon.size / 2},${balloon.size * 1.15}
                  Q ${balloon.size / 2 + 7 * Math.sin(balloon.id * 1.2)},${
                  balloon.size * 1.3 + 10
                }
                    ${balloon.size / 2},${balloon.size * 1.3 + 26}
                `}
                stroke={balloon.color}
                strokeWidth="2"
                fill="none"
                opacity="0.32"
              />
              {/* Tail - triangle or curved 'tie' at the bottom */}
              <polygon
                points={`
                  ${balloon.size / 2 - balloon.size * 0.07},${
                  balloon.size * 1.15
                }
                  ${balloon.size / 2 + balloon.size * 0.07},${
                  balloon.size * 1.15
                }
                  ${balloon.size / 2},${balloon.size * 1.19}
                `}
                fill={balloon.color}
                opacity="0.36"
              />
              {/* Optional: small knot/shadow under tie */}
              <ellipse
                cx={balloon.size / 2}
                cy={balloon.size * 1.18}
                rx={balloon.size * 0.06}
                ry={balloon.size * 0.025}
                fill="#333"
                opacity="0.11"
              />
            </svg>
          </div>
        ) : null
      )}
    </div>
  );
};

export default FirstPage;
