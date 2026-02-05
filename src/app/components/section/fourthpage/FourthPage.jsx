import React, { useEffect, useRef } from "react";

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

function HeartPoppers() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    let running = true;
    function popHeart() {
      if (!running) return;
      for (let i = 0; i < 2; i++) {
        const heart = document.createElement("div");
        const size = randomBetween(16, 48); // px
        const left = randomBetween(0, 100); // vw
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
        heart.style.position = "fixed";
        heart.style.left = `${left}vw`;
        heart.style.top = "100vh";
        heart.style.pointerEvents = "none";
        heart.style.transform = `translateY(0) rotate(${rotate}deg)`;
        heart.style.transition = `transform ${duration}s cubic-bezier(0.3, 0.1, 0.8, 0.8), opacity ${duration}s`;
        heart.style.opacity = 1;
        heart.style.zIndex = 9999;

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

  return (
    <div
      ref={containerRef}
      style={{
        pointerEvents: "none",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 15,
      }}
    />
  );
}

export default function FourthPage() {
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
      <HeartPoppers />
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
    </div>
  );
}
