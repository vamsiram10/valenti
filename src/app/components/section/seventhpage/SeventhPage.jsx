"use client";
import { useEffect, useRef, useState } from "react";

// Helper to sample an integer or float within a range
function getRandomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

function HeartSVG({ color = "#fbb6ce" }) {
  return (
    <svg
      width="34"
      height="30"
      viewBox="0 0 34 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M16.85 28.14C16.97 28.25 17.15 28.25 17.27 28.14C24.53 21.96 30.28 16.95 32.7 13.86C36.82 8.09 30.91 0.24 22.97 4.08C21.1 5.04 19.97 6.73 17.98 9.37C16 6.72 14.87 5.04 13 4.08C5.04 0.24 -0.86 8.09 3.27 13.86C5.69 16.95 11.45 21.96 18.7 28.14Z"
        fill={color}
        fillOpacity="1"
      />
    </svg>
  );
}

const HEART_COLORS = [
  "#fbb6ce",
  "#fd9fcf",
  "#fde3f7",
  "#FDE68A",
  "#fd397a77",
  "#fd397ab0",
  "#ffafc2",
  "#f9b1c6",
];

// Generates parameters for a heart shape
function createHeartProps() {
  const x = getRandomBetween(2, 98); // vw
  const delay = getRandomBetween(0, 3.2);
  const scale = getRandomBetween(0.6, 1.45);
  const duration = getRandomBetween(2.3, 4.2);
  const rot = getRandomBetween(-33, 38);
  const color =
    HEART_COLORS[Math.floor(getRandomBetween(0, HEART_COLORS.length))];
  const animX = getRandomBetween(-130, 130);
  const animY = -getRandomBetween(58, 120); // go up at least 'vh'
  const top = getRandomBetween(94, 98); // vh
  const opacity = getRandomBetween(0.8, 1);
  return {
    x,
    delay,
    scale,
    duration,
    rot,
    color,
    animX,
    animY,
    top,
    opacity,
  };
}

/**
 * SSR SAFE: Only renders hearts client-side after mount to avoid hydration mismatch.
 */
export default function SeventhPage() {
  const containerRef = useRef(null);
  const heartCount = 65;
  const [hearts, setHearts] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  // Show loader initially; skip reruns
  // Only generate hearts if not loading
  useEffect(() => {
    if (!showLoader) {
      const heartsParams = Array.from({ length: heartCount }).map(() =>
        createHeartProps()
      );
      setHearts(heartsParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heartCount, showLoader]);

  // Animation re-randomization for hearts (only when not loading)
  useEffect(() => {
    if (showLoader) return;
    if (hearts.length === 0) return;
    const container = containerRef.current;
    if (!container) return;
    const heartsEls = Array.from(container.querySelectorAll(".floating-heart"));
    let timeouts = [];
    heartsEls.forEach((heart) => {
      heart.addEventListener("animationend", function reanim(e) {
        const props = createHeartProps();
        heart.style.left = `${props.x}vw`;
        heart.style.top = `${props.top}vh`;
        heart.style.opacity = props.opacity;
        heart.style.transform = `scale(${props.scale}) rotate(${props.rot}deg)`;
        heart.style.setProperty("--heart-anim-x", `${props.animX}px`);
        heart.style.setProperty("--heart-anim-y", `${props.animY}vh`);
        heart.style.animation = "none";
        const timeout = setTimeout(() => {
          heart.style.animation = `heart-pop ${props.duration}s cubic-bezier(.49,.19,.38,1) forwards`;
          heart.style.animationDelay = `${props.delay}s`;
          const svg = heart.querySelector("svg path");
          if (svg) svg.setAttribute("fill", props.color);
        }, 50 + getRandomBetween(0, 400));
        timeouts.push(timeout);
      });
    });
    return () => {
      heartsEls.forEach((heart) => {
        heart.replaceWith(heart.cloneNode(true));
      });
      timeouts.forEach(clearTimeout);
    };
  }, [hearts, showLoader]);

  if (showLoader) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          position: "relative",
          left: 0,
          top: 0,
          zIndex: 9999,
        }}
      >
        <img
          src="/photo.jpeg"
          alt="Loading..."
          style={{
            width: "90vw",
            height: "90vh",
            objectFit: "contain",
            cursor: "pointer",
          }}
          draggable={false}
          onClick={() => setShowLoader(false)}
          title="Click to Continue"
        />
        <span
          style={{
            position: "absolute",
            bottom: "15vh",
            left: "50%",
            transform: "translateX(-50%)",
            color: "##fd397a",
            fontSize: "2.2rem",
            fontWeight: 700,

            userSelect: "none",

            padding: "0.2em 1em",

            pointerEvents: "none",
          }}
        >
          Click Camera Kido
        </span>
      </div>
    );
  }

  return (
    <>
      {/* Animations for hearts */}
      <style>{`
        @keyframes heart-pop {
          0% {
            opacity: 0.05;
            transform: var(--heart-init-transform, scale(0.7));
            filter: blur(2.5px) brightness(1.23);
          }
          7% {
            opacity: 1;
            filter: blur(0.8px) brightness(1.05);
          }
          28% {
            filter: blur(0.4px) brightness(1.12);
          }
          52% {
            filter: blur(0.1px) brightness(1.11);
          }
          89% {
            opacity: 0.92;
          }
          100% {
            filter: blur(2.7px) brightness(1.05) grayscale(.11);
            opacity: 0;
            transform: translate(var(--heart-anim-x,0),var(--heart-anim-y,-90vh)) scale(0.88);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          margin: 0,
          padding: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "white",
          position: "relative",
        }}
      >
        {/* Many floating hearts! */}
        {hearts.map((props, idx) => (
          <div
            className="floating-heart"
            key={idx}
            style={{
              position: "absolute",
              left: `${props.x}vw`,
              top: `${props.top}vh`,
              opacity: props.opacity,
              zIndex: 12,
              pointerEvents: "none",
              animation: `heart-pop ${props.duration}s cubic-bezier(.49,.19,.38,1) forwards`,
              animationDelay: `${props.delay}s`,
              willChange: "transform, left, top, opacity",
              "--heart-anim-x": `${props.animX}px`,
              "--heart-anim-y": `${props.animY}vh`,
              transform: `scale(${props.scale}) rotate(${props.rot}deg)`,
            }}
          >
            <HeartSVG color={props.color} />
          </div>
        ))}
        <img
          src="/discmain.jpg"
          alt="Disc"
          style={{
            width: "30vw",
            height: "100vh",
            objectFit: "fill",
            display: "block",
            userSelect: "none",
          }}
          draggable={false}
        />
        {/* Centered Text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#f686b6",
            fontWeight: 500,
            fontSize: "2rem",
            textAlign: "center",
            letterSpacing: "0.05em",
            textShadow: "0 2px 12px #ffd1e6aa",
            background: "rgba(255,255,255,0.81)",
            padding: "16px 34px",
            zIndex: 20,
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "'Dancing Script','Pacifico',cursive",
          }}
        >
          Moments I&apos;ll always hold close
        </div>
        <img
          src="/roller.jpg"
          alt="Roller"
          style={{
            width: "18vw",
            height: "90vh",
            marginTop: "40px",
            objectFit: "fill",
            display: "block",
            userSelect: "none",
          }}
          draggable={false}
        />
      </div>
    </>
  );
}
