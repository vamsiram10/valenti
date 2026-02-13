"use client";
import { useState, useRef } from "react";

// A simple array of sparkle configurations for the loader background
const SPARKLES = [
  { top: "12%", left: "15%", size: 18, delay: "0s", opacity: 0.72 },
  { top: "65%", left: "35%", size: 16, delay: "2.2s", opacity: 0.77 },
  { top: "33%", left: "74%", size: 26, delay: "1.3s", opacity: 0.9 },
  { top: "76%", left: "82%", size: 13, delay: "1.7s", opacity: 0.63 },
  { top: "19%", left: "81%", size: 14, delay: "0.8s", opacity: 0.81 },
  { top: "52%", left: "57%", size: 20, delay: "1.1s", opacity: 0.73 },
  { top: "87%", left: "21%", size: 23, delay: "2.7s", opacity: 0.82 },
  { top: "43%", left: "53%", size: 15, delay: "1.5s", opacity: 0.74 },
  { top: "10%", left: "63%", size: 18, delay: "2.1s", opacity: 0.72 },
  { top: "27%", left: "40%", size: 14, delay: "0.4s", opacity: 0.68 },
];

function LoaderSparkles() {
  // Renders sparkle "stars" as absolutely positioned elements
  return (
    <div
      className="loader-sparkles"
      style={{
        pointerEvents: "none",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        zIndex: 2,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {SPARKLES.map((sparkle, idx) => (
        <span
          key={idx}
          className="sparkle-anim"
          style={{
            position: "absolute",
            top: sparkle.top,
            left: sparkle.left,
            width: sparkle.size,
            height: sparkle.size,
            opacity: sparkle.opacity,
            filter: "drop-shadow(0 0 2px #fd397a44)",
            zIndex: 2,
            animationDelay: sparkle.delay,
            pointerEvents: "none",
          }}
        >
          {/* SVG sparkle for best anti-aliasing & animation */}
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
            }}
          >
            <polygon
              points="12,2 14.2,8.5 21,9.2 15.6,13.7 17,21 12,17.2 7,21 8.4,13.7 3,9.2 9.8,8.5"
              fill="#fd397a"
            >
              <animate
                attributeName="opacity"
                values="1;0.2;1"
                dur="2.4s"
                begin={sparkle.delay}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="scale"
                values="1;1.22;1"
                dur="1.8s"
                begin={sparkle.delay}
                additive="sum"
                repeatCount="indefinite"
              />
            </polygon>
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function SixthPage() {
  const [opened, setOpened] = useState(false);
  const [animate, setAnimate] = useState(false);
  const imgRef = useRef(null);

  const handleOpen = () => {
    setAnimate(true);
    setTimeout(() => {
      setOpened(true);
      setAnimate(false);
    }, 700);
  };

  let content;
  if (!opened) {
    content = (
      <>
        <img
          ref={imgRef}
          src="/letter.jpeg"
          alt="Open Letter"
          style={{
            width: "80vw",
            height: "60vh",
            cursor: "pointer",
            background: "white",
            objectFit: "contain",
            zIndex: 10,
            position: "relative",
            transition: "filter 0.2s",
          }}
          className={animate ? "animated-letter" : ""}
          onClick={() => !animate && handleOpen()}
          draggable={false}
        />
        <div
          style={{
            marginTop: "2.5rem",

            fontSize: "2rem",
            color: "pink",
            fontWeight: "bold",
            letterSpacing: "0.02em",
            userSelect: "none",
            textShadow: "0 1px 10px #fd397a22",
            zIndex: 11,
            textAlign: "center",
          }}
        >
          Letter For You My Love
        </div>
      </>
    );
  } else {
    content = (
      <div
        style={{
          background: "white",
          borderRadius: 24,
          boxShadow: "0 4px 32px #fd397a22",
          border: "2px solid #fd397a",
          padding: "54px 48px 54px 64px",
          minWidth: 700,
          minHeight: 600,
          position: "relative",
          maxWidth: "1000px",
          width: "80vw",
          maxHeight: "90vh",
          overflow: "hidden",
          fontFamily: "'Shadows Into Light', 'Caveat', cursive, sans-serif",
        }}
      >
        {/* Drawing pink lines */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            bottom: 54,
            zIndex: 0,
          }}
        >
          {Array.from({ length: 15 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                top: `${idx * 32}px`,
                height: 1.5,
                background:
                  idx === 0
                    ? "transparent"
                    : "linear-gradient(90deg,#fd397a60 30%,#fd397a28 70%)",
              }}
            ></div>
          ))}
        </div>
        {/* Margin vertical pink guideline (classic notebook!) */}
        <div
          style={{
            position: "absolute",
            top: 53,
            left: 44,
            bottom: 54,
            width: 2,
            background: "linear-gradient(#fd397a66 90%,transparent)",
            zIndex: 1,
          }}
        />

        {/* My Valentine message, written here */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,217,234,0.52) 25%, rgba(221,242,253,0.11) 100%)",
            boxShadow:
              "0 12px 64px 6px rgba(250,80,168,0.10), 0 2px 16px 3px rgba(249,39,116,0.10) inset",
            backdropFilter: "blur(2.5px) saturate(1.22)",
            borderRadius: "24px 20px 18px 26px/22px 28px 18px 19px",
            border: "2.3px solid rgba(255,64,154,0.16)",
            width: "100%",
            height: "100%",
            fontFamily: "'Shadows Into Light', 'Caveat', cursive, sans-serif",
            fontSize: "1.35rem",
            color: "black",
            outline: "none",
            border: "none",
            paddingLeft: 0,
            paddingTop: 68,
            paddingRight: 4,
            lineHeight: "32px",
            letterSpacing: "0.03em",
            fontWeight: 500,
            whiteSpace: "pre-wrap",
          }}
        >
          {/* Add a round image at the top of the letter */}
          {/* Heading for the letter */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "3rem",
              color: "black",
              position: "absolute",
              top: "0px",
              right: "69px",
              fontFamily: "'Times New Roman', Times, serif",
              fontWeight: 200,
            }}
          >
            MY LETTER TO YOU
          </div>
          {/* Add a round image at the top of the letter */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              right: "5px",
              bottom: "3rem",
            }}
          >
            <img
              src="/us.JPG"
              alt="Valentine"
              style={{
                width: 250,
                height: 250,
                objectFit: "cover",
                borderRadius: "50%",
                border: "3px solid #fd397a77",
                background: "#fff",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "1.4rem",
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            Happy valentines!
            <br />
            <br />
            You are the best thing that has ever happened to me . No matter what
            the future brings , ik and i wish everything will be okay and fine ,
            we went through good and bad times and so many ups and downs along
            the way .
            <br />
            <br />
            every day with you feels like a gift, idk why but i feel like your
            presence makes everything better ra and your words and your actions
            mean so much to me . From morning till night, I keep wishing I could
            be there with you and I wish that from now on, everything between us
            will be fine and full of happiness.
            <br />
            <br />I love You 💕
          </span>
        </div>
        {/* Optional: drawn heart in the letter */}
        {Array.from({ length: 8 }).map((_, idx) => (
          <span
            key={idx}
            style={{
              position: "absolute",
              // Arrange the hearts in a scattered pattern
              bottom: 24 + Math.sin(idx) * 14 + idx * 10,
              right: 42 + Math.cos(idx * 1.3) * 22 + idx * 12,
              fontSize: `${1.4 + 0.18 * ((idx % 3) - 1)}rem`,
              zIndex: 5,
              opacity: 0.4 + 0.2 * (idx % 3),
              userSelect: "none",
              transform: `rotate(${(idx - 3) * 15}deg)`,
              color: "#fd397a",
            }}
          >
            ♥
          </span>
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes letterOpen {
          0% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
            opacity: 1;
          }
          40% {
            transform: scale(1.04) rotate(-1.5deg);
            filter: brightness(1.1) drop-shadow(0 0 24px #fd397a66);
            opacity: 0.99;
          }
          65% {
            transform: scale(0.96,1.02) rotate(2deg);
            filter: brightness(1.07) drop-shadow(0 0 44px #fd397a44);
            opacity: 0.98;
          }
          80% {
            transform: scale(1.1, 0.92) rotate(-2deg);
            filter: brightness(1.13) drop-shadow(0 0 10px #fd397a88);
            opacity: 1;
          }
          90% {
            transform: scale(1.04,1.04) rotate(0deg);
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            opacity: 1;
          }
          100% {
            transform: scale(0.85,1.04) rotate(0deg) translateY(-38vh) scaleY(0.07);
            filter: brightness(1.05) blur(2px) grayscale(.35);
            opacity: 0;
          }
        }
        .animated-letter {
          animation: letterOpen 0.7s cubic-bezier(0.65, 0, 0.25, 1) forwards;
          will-change: transform, filter, opacity;
        }
        /* Sparkle Animations */
        .sparkle-anim {
          animation: sparkleTwinkle 2.1s infinite both alternate;
        }
        @keyframes sparkleTwinkle {
          0% { opacity: 0.13; transform: scale(1) rotate(0deg);}
          12% { opacity: 0.85;}
          28% { opacity: 1;  }
          52% { opacity: 0.88; }
          87% { opacity: 0.35;  }
          100% { opacity: 0.18; transform: scale(1.14) rotate(14deg);}
        }
      `}</style>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "white",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {!opened && <LoaderSparkles />}
        {content}
      </div>
    </>
  );
}
