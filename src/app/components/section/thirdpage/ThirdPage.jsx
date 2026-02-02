"use client";
import React from "react";

// Helper component moved above ThirdPage, so it is defined
function EscClosePopup({ children, onClose }) {
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return children;
}

// Heart SVG component (pink)
const Heart = ({ style = {} }) => (
  <svg
    width="32"
    height="28"
    viewBox="0 0 44 40"
    fill="none"
    style={{ ...style, display: "block" }}
  >
    <path
      d="M32.5 2.5c-4 0-6.5 3-7.6 4.7C23.8 5.5 21.1 2.5 17.5 2.5 12.1 2.5 8 6.7 8 13.1c0 7.1 6.3 11.5 21 23.9 14.7-12.5 21-16.8 21-23.9C44 6.7 39.9 2.5 34.5 2.5z"
      fill="#fd85b3"
      stroke="#fff"
      strokeWidth="2"
    />
  </svg>
);

// Hearts animation component
const FlyingHearts = ({ vampRef }) => {
  const [hearts, setHearts] = React.useState([]);
  const [ready, setReady] = React.useState(false);

  // Wait until the vampRef is available in the DOM
  React.useEffect(() => {
    if (vampRef.current) setReady(true);
  }, [vampRef]);

  React.useEffect(() => {
    if (!ready) return;
    let running = true;
    let lastSpawn = Date.now();

    const spawnHeart = () => {
      if (!vampRef.current) return;
      // Get bounding rect for vamp image
      const rect = vampRef.current.getBoundingClientRect();
      const baseX = rect.left + rect.width / 2;
      const baseY = rect.top + rect.height / 2;

      // NEW: Reduce offset and range to bring hearts closer to vamp.png
      // Old: const offset = 32 + Math.random() * 28; // px offset outside the image
      // We'll use a smaller offset for closer effect
      const offset = 10 + Math.random() * 18; // px offset outside the image (closer)

      const edge = Math.floor(Math.random() * 4);
      let x, y;
      if (edge === 0) {
        // top
        x = rect.left + rect.width * (0.25 + Math.random() * 0.5); // spawn within 25% - 75% width
        y = rect.top - offset;
      } else if (edge === 1) {
        // right
        x = rect.right + offset;
        y = rect.top + rect.height * (0.25 + Math.random() * 0.5);
      } else if (edge === 2) {
        // bottom
        x = rect.left + rect.width * (0.25 + Math.random() * 0.5);
        y = rect.bottom + offset;
      } else {
        // left
        x = rect.left - offset;
        y = rect.top + rect.height * (0.25 + Math.random() * 0.5);
      }

      // Bring hearts' fly animation start and end closer to the vamp
      // Reduce random factors a bit for tighter animation
      const dx = (x - baseX) * 0.3 + (Math.random() - 0.5) * 16;
      const dy = (y - baseY) * 0.25 - 48 - Math.random() * 28; // go outward/up a bit, less far

      setHearts((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9) + Date.now(),
          x,
          y,
          dx,
          dy,
          rot: (Math.random() - 0.5) * 30,
          scale: 0.7 + Math.random() * 0.7,
          duration: 1800 + Math.random() * 500,
          delay: Math.random() * 80,
        },
      ]);
    };

    function loop() {
      const now = Date.now();
      if (now - lastSpawn > 130) {
        spawnHeart();
        lastSpawn = now;
      }
      if (running) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    return () => {
      running = false;
    };
    // eslint-disable-next-line
  }, [vampRef, ready]);

  // Clean up hearts when finished animating
  React.useEffect(() => {
    if (!hearts.length) return;
    const timer = setTimeout(() => {
      setHearts((hs) =>
        hs.filter((h) => {
          // Remove after anim duration + buffer
          return (
            Date.now() - Number(h.id.split(/[a-z]/).join("")) < h.duration + 900
          );
        })
      );
    }, 900);
    return () => clearTimeout(timer);
  }, [hearts]);

  // Prevent error: do not access vampRef.current during render unless ready
  if (!ready) return null;

  // Render all hearts, absolutely positioned over vamp's container (viewport)
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: h.x,
            top: h.y,
            transform: `translate(-50%,-50%) scale(${h.scale}) rotate(${h.rot}deg)`,
            opacity: 0.8,
            pointerEvents: "none",
            transition: "none",
            animation: `heart-float-${h.id} ${h.duration}ms ease-out ${h.delay}ms forwards`,
            willChange: "transform, opacity",
          }}
        >
          <Heart />
          <style>{`
            @keyframes heart-float-${h.id} {
              0% {
                opacity: 0;
                transform: translate(-50%,-50%) scale(${h.scale}) rotate(${
            h.rot
          }deg);
              }
              18% { opacity: 0.99; }
              100% {
                transform: translate(calc(-50% + ${h.dx}px), calc(-50% + ${
            h.dy
          }px)) scale(${h.scale * 0.85}) rotate(${h.rot + 40}deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
};

const ThirdPage = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const vampRef = React.useRef();

  return (
    <div
      style={{
        color: "black",
        backgroundColor: "white",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src="/letter.png"
          alt="Paper"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            right: 450,
          }}
        />
        <img
          src="/heart.jpg"
          alt="Heart"
          style={{
            position: "absolute",
            top: -60,
            left: "72rem",
            right: 0,
            width: "20vw",
            height: "50vh",
            objectFit: "contain",
            zIndex: 2,
            transform: "rotate(-70deg)",
          }}
        />
        {/* Animated Hearts just outside the vamp.png image */}
        <FlyingHearts vampRef={vampRef} />
        <>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "54%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              zIndex: 3,
            }}
          >
            <span
              style={{
                position: "relative",
                left: "4rem",
                fontSize: "2rem",
                color: "pink",
                fontWeight: "bold",

                whiteSpace: "pre-line",
                textAlign: "right",
                transform: "rotate(-10deg)",
                fontFamily:
                  "'Varela Round', 'Comic Sans MS', cursive, sans-serif", // Ensure fallback if Varela Round not loaded
              }}
            >
              {"A Moment\nTo Remember\nyou&me"}
            </span>
            <img
              ref={vampRef}
              src="/vamp.PNG"
              alt="Vamp"
              style={{
                transform: "rotate(-10deg)",
                width: "40vw",
                height: "60vh",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => setShowPopup(true)}
            />
          </div>
          <span
            style={{
              position: "absolute",
              top: "calc(50% + 30vh)",
              left: "65%",
              transform: "translate(-50%, 0) rotate(-10deg)",
              zIndex: 4,
              color: "pink",
              fontWeight: 600,
              fontSize: "1rem",
              background: "none",
              padding: 0,
              borderRadius: 0,
              boxShadow: "none",
              textAlign: "center",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              // no display block!
            }}
          >
            Click On Image to Watch Original
          </span>
          {showPopup && (
            <EscClosePopup onClose={() => setShowPopup(false)}>
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 9999,
                }}
                onClick={() => setShowPopup(false)}
              >
                <img
                  src="/kiss2.jpg"
                  alt="Popup"
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                    pointerEvents: "auto",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </EscClosePopup>
          )}
        </>
        {/* Fixed image at bottom right corner */}
        <img
          src="/vampicshow.jpg"
          alt="Vampic Show"
          style={{
            position: "absolute",
            bottom: "20px",
            right: 0,
            maxWidth: "90vw",
            maxHeight: "40vh",
            width: "auto",
            height: "auto",
            zIndex: 10000,
            display: "block",
          }}
        />
      </div>
    </div>
  );
};

export default ThirdPage;
