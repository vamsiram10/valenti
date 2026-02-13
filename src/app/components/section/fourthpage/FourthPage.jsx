"use client";
import React, { useEffect, useRef, useState } from "react";

// -- Responsive CSS injection for mobile only --
const responsiveMobileStyle = `
@media (max-width: 767px) {
  .fourthpage-semicircle-text {
    top: 7% !important;
    width: 98vw !important;
    height: 18vw !important;
  }
  .fourthpage-img-left {
    left: 2vw !important;
    top: 76% !important;
    img {
      max-width: 30vw !important;
      max-height: 20vw !important;
      border-radius: 2vw !important;
    }
  }
  .fourthpage-img-right {
    right: 2vw !important;
    top: 76% !important;
    img {
      max-width: 35vw !important;
      max-height: 26vw !important;
    }
  }
  .fourthpage-img-centerbottom {
    bottom: 1vh !important;
    left: 50vw !important;
    img {
      max-width: 36vw !important;
      max-height: 19vw !important;
    }
  }
  .fourthpage-youare {
    top: 60% !important;
    left: 50vw !important;
    img {
      max-width: 36vw !important;
      max-height: 18vw !important;
    }
  }
  .fourthpage-forever {
    top: 79% !important;
    left: 76vw !important;
    img {
      max-width: 36vw !important;
      max-height: 17vw !important;
      right: unset !important;
      left: 0 !important;
      position: static !important;
    }
  }
  .fourthpage-flower-main {
    max-width: 80vw !important;
    max-height: 35vw !important;
    left: 50vw !important;
    top: 31% !important;
    position: absolute !important;
    transform: translateX(-50%) !important;
  }
  .secret-img-custom {
    width: 34vw !important;
    height: auto !important;
    max-width: 80vw !important;
  }
  .secret-img-text {
    font-size: 5vw !important;
    margin-left: 2vw !important;
    margin-top: 4vw !important;
  }
}
`;

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const HEART_COLORS = [
  "#ffb6d5", // main light pink
  "#ffc8dd",
  "#ffd6ea",
  "#ffe1f0",
  "#ff99cc",
  "#ffb3de",
  "#ffaad5",
];

// Darker sparkle colors (edit for 'more dark' sparkle)
const SPARKLE_COLORS = [
  "#c54b7d", // medium dark pink
  "#ff5e91", // strong pink
  "#90447a", // deep muted plum
  "#b66d82", // muted berry
  "#843553", // even deeper
  "#551f37", // very dark pink
  "#9f577f", // dusty pink
  "#fff", // some white remains for variety
  "#ffd6ea", // soft existing pink for a few
];

// Shapes unchanged (some shapes are already slightly 'dark' in theme)
const SPARKLE_SHAPES = [
  // Four-point star
  `<svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><g><g><path d="M9 0 L10 7 L17 9 L10 11 L9 18 L8 11 L1 9 L8 7 Z" fill="CURRENTCOLOR" fill-opacity="0.97"/></g></g></svg>`,
  // Simple circle/spot (dark)
  `<svg width="12" height="12"><circle cx="6" cy="6" r="4" fill="CURRENTCOLOR" fill-opacity="0.93"/></svg>`,
  // Cross (dark)
  `<svg width="16" height="16"><rect x="7" y="1" width="2" height="14" rx="1" fill="CURRENTCOLOR" fill-opacity="0.85"/><rect x="1" y="7" width="14" height="2" rx="1" fill="CURRENTCOLOR" fill-opacity="0.85"/></svg>`,
  // Diamond (dark)
  `<svg width="14" height="14"><polygon points="7,1 13,7 7,13 1,7" fill="CURRENTCOLOR" fill-opacity="0.93"/></svg>`,
];

// ---- MORE SPARKLES: Increase count (and pop frequency) throughout! ----
function SparkleLoaderBackground({}) {
  const sparkleRef = useRef();

  useEffect(() => {
    const container = sparkleRef.current;
    if (!container) return;
    let running = true;

    function sparklePop() {
      if (!running) return;

      // INCREASE sparkle count per pop!
      const count = Math.round(randomBetween(3, 8)); // was (1,3)
      for (let i = 0; i < count; i++) {
        const sparkle = document.createElement("div");

        const color =
          SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
        const shapeSvg = SPARKLE_SHAPES[
          Math.floor(Math.random() * SPARKLE_SHAPES.length)
        ].replace(/CURRENTCOLOR/g, color);

        // Increase sparkle size range too for variety!
        const size = randomBetween(9, 28); // was (10,22)
        const left = randomBetween(0, 100); // percent
        const top = randomBetween(0, 100); // percent
        const rotate = randomBetween(0, 360);
        const duration = randomBetween(0.85, 1.8); // sl durations a bit longer: was (0.7,1.7)

        sparkle.innerHTML = shapeSvg;
        sparkle.style.position = "absolute";
        sparkle.style.left = `${left}%`;
        sparkle.style.top = `${top}%`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.opacity = 0;
        sparkle.style.transition = `opacity ${
          duration * 0.5
        }s cubic-bezier(.8,0,.4,1), transform ${duration}s cubic-bezier(.5,.4,.6,1)`;
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = 3;
        sparkle.style.transform = `scale(0.5) rotate(${rotate}deg)`;

        container.appendChild(sparkle);

        setTimeout(() => {
          sparkle.style.opacity = 1;
          sparkle.style.transform = `scale(1.14) rotate(${rotate + 8}deg)`;
        }, 5);

        // Fade out
        setTimeout(() => {
          sparkle.style.opacity = 0;
          sparkle.style.transform = `scale(0.6) rotate(${
            rotate + randomBetween(-10, +10)
          }deg)`;
        }, duration * 800);

        setTimeout(() => {
          if (container.contains(sparkle)) container.removeChild(sparkle);
        }, duration * 1000 + 800);
      }

      // DECREASE timeout for faster sparkle spawning: was (175,650)
      setTimeout(sparklePop, randomBetween(60, 250));
    }
    sparklePop();
    return () => {
      running = false;
    };
  }, []);

  return (
    <div
      ref={sparkleRef}
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2,
        overflow: "hidden",
        userSelect: "none",
      }}
    />
  );
}

function HeartPoppers({ parentRef }) {
  const localRef = useRef();

  useEffect(() => {
    const container = localRef.current;
    if (!container) return;

    let running = true;
    function popHeart() {
      if (!running) return;
      for (let i = 0; i < 2; i++) {
        const heart = document.createElement("div");
        const size = randomBetween(16, 48); // px
        const left = randomBetween(0, 100); // percent of container width
        const rotate = randomBetween(-35, 35);
        const duration = randomBetween(2, 4.8); // s
        const color =
          HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
        heart.innerHTML = `
          <svg viewBox="0 0 32 29.6" fill="${color}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
            <path d="M23.6,0c-2.7,0-5.1,1.7-6.6,4.1C15.5,1.7,13.1,0,10.4,0C4.7,0,0,4.7,0,10.4
                  c0,6.4,6.7,11.6,16,19.2c9.3-7.6,16-12.8,16-19.2C32,4.7,27.3,0,23.6,0z"/>
          </svg>
        `;
        heart.style.position = "absolute";
        heart.style.left = `${left}%`;
        heart.style.top = "100%";
        heart.style.pointerEvents = "none";
        heart.style.transform = `translateY(0) rotate(${rotate}deg)`;
        heart.style.transition = `transform ${duration}s cubic-bezier(0.3, 0.1, 0.8, 0.8), opacity ${duration}s`;
        heart.style.opacity = 1;
        heart.style.zIndex = 99;

        container.appendChild(heart);

        setTimeout(() => {
          heart.style.transform = `translateY(-110vh) rotate(${
            rotate + 45
          }deg) scale(${randomBetween(0.7, 1.3)})`;
          heart.style.opacity = 0;
        }, 16);

        setTimeout(() => {
          if (container.contains(heart)) container.removeChild(heart);
        }, duration * 1000 + 800);
      }
      setTimeout(popHeart, randomBetween(50, 100));
    }

    popHeart();
    return () => {
      running = false;
    };
  }, []);

  // Use parentRef to size/cover the area, default to 100vw x 100vh if none
  return (
    <div
      ref={localRef}
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 15,
        overflow: "hidden",
      }}
    />
  );
}

export default function FourthPage() {
  // state to handle "secret" visible or not
  const [pageVisible, setPageVisible] = useState(false);
  const pageDivRef = useRef();

  // Inject responsive CSS for mobile only (only once).
  useEffect(() => {
    if (!document.getElementById("fourthpage-responsive-style")) {
      const styleTag = document.createElement("style");
      styleTag.id = "fourthpage-responsive-style";
      styleTag.innerHTML = responsiveMobileStyle;
      document.head.appendChild(styleTag);
    }
    return () => {
      if (document.getElementById("fourthpage-responsive-style"))
        document.getElementById("fourthpage-responsive-style").remove();
    };
  }, []);

  return (
    <div
      ref={pageDivRef}
      style={{
        background: "#fff",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        fontFamily: "'Staatliches', cursive, sans-serif",
        color: "#ffb6d5", // light pink
        overflow: "hidden",
      }}
    >
      {/* SparkleLoader: add sparkles behind loader content */}
      {!pageVisible && <SparkleLoaderBackground />}
      {/* Secret trigger image and side text */}
      {!pageVisible && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: "fit-content",
          }}
        >
          <img
            src="/secret.jpeg"
            alt="secret"
            className="secret-img-custom"
            style={{
              zIndex: 0,
              top: "15vh",
              left: "50vw",
              width: "450px",
              maxWidth: "90vw",
              maxHeight: "60vh",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setPageVisible(true)}
          />
          <span
            className="secret-img-text"
            style={{
              marginLeft: "18px",
              fontSize: "2.1rem",
              color: "#ff7ea3",
              fontFamily: "'Staatliches', cursive, sans-serif",
              fontWeight: "bold",
              letterSpacing: "2px",
              cursor: "pointer",
              userSelect: "none",
              transition: "color .2s",

              position: "relative",
              top: "60px",
              whiteSpace: "nowrap",
              overflowx: "hidden",
            }}
            onClick={() => setPageVisible(true)}
          >
            Click Me Mine
          </span>
        </div>
      )}
      {/* The rest is only visible if pageVisible is true */}
      {pageVisible && (
        <>
          <HeartPoppers parentRef={pageDivRef} />
          {/* Add sparkles to the forever page as well! */}
          <SparkleLoaderBackground />
          {/* Semi-circle text above image */}
          <div
            className="fourthpage-semicircle-text"
            style={{
              position: "absolute",
              top: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "57vw",
              height: "12vw",
              pointerEvents: "none",
              zIndex: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <svg
              viewBox="0 0 500 180"
              width="100%"
              height="100%"
              style={{ overflow: "visible" }}
            >
              <defs>
                <path
                  id="semiCirclePath"
                  d="M 30,150 A 220,110 0 0 1 470,150"
                  fill="none"
                />
              </defs>
              <text
                fill="#ffb6d5"
                fontSize="36"
                fontFamily="'Staatliches', cursive, sans-serif"
                fontWeight="bold"
                letterSpacing="3"
              >
                <textPath
                  href="#semiCirclePath"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  Flowers For You My Love 🫶🏻
                </textPath>
              </text>
            </svg>
          </div>

          {/* Left center text */}
          <div
            className="fourthpage-img-left"
            style={{
              position: "absolute",
              left: "3vw",
              top: "90%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
          >
            <img
              src="/ialways.jpg"
              alt="I Always Love You"
              style={{
                borderRadius: "1.5vw",
                border: "2px solid #fff",
                maxWidth: "220px",
                maxHeight: "170px",
                objectFit: "cover",
                background: "#ffb6d5",
              }}
            />
          </div>
          <div
            className="fourthpage-img-right"
            style={{
              position: "absolute",
              right: "3vw",
              top: "90%",
              transform: "translateY(-50%)",
              zIndex: 101,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 0,
            }}
          >
            <img
              src="/tothe.png"
              alt="To The"
              style={{
                maxWidth: "350px",
                maxHeight: "280px",
                objectFit: "contain",
                background: "#ffb6d5",
                display: "block",
              }}
            />
          </div>
          <div
            className="fourthpage-img-centerbottom"
            style={{
              position: "absolute",
              bottom: "4vh",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/ap.jpg"
              alt="Always"
              style={{
                border: "2px solid #fff",
                maxWidth: "250px",
                maxHeight: "190px",
                objectFit: "cover",
                background: "#ffb6d5",
                display: "block",
              }}
            />
          </div>
          <div
            className="fourthpage-youare"
            style={{
              position: "absolute",
              top: "75%",
              left: "30%",
              transform: "translateX(-50%)",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/youare.png"
              alt="You Are"
              style={{
                maxWidth: "30vw",
                maxHeight: "30vh",
                display: "block",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
          </div>
          <div
            className="fourthpage-forever"
            style={{
              position: "absolute",
              top: "90%",
              left: "77%",
              transform: "translateX(-50%)",
              zIndex: 0,
              pointerEvents: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/forever.png"
              alt="Forever"
              style={{
                position: "absolute",
                right: "26%",
                maxWidth: "30vw",
                maxHeight: "30vh",
                zIndex: 1,
              }}
            />
          </div>

          <img
            className="fourthpage-flower-main"
            src="/flower.jpg"
            alt="Flower"
            style={{
              maxWidth: "45vw",
              maxHeight: "45vh",
              display: "block",
              zIndex: 1,
            }}
          />

          {/* Add boo.jpeg to the right top middle corner, big */}
          {/* Add me.png to the left bottom corner */}
          {/* Add cute emoji.jpeg to the middle right side */}
          {/* Add aa.png to the right corner */}
        </>
      )}
    </div>
  );
}
