"use client";
import React from "react";

// Instructions:
// - Where should I write the text? Write your text in the `baseText` variable inside the FifthPageContent component below.
// - How do I change the scrolling speed? Change the value of the `scrollSpeed` variable (measured in pixels per frame, higher = faster).

const FifthPageContent = () => {
  const [count, setCount] = React.useState(15); // Changed from 5 to 15
  const [showText, setShowText] = React.useState(false);
  const textRef = React.useRef(null);
  const animationRef = React.useRef(0);

  // Write your desired text here:
  const baseText =
    "You Are My Favourite Girl And I Love You So So So Much ...... ";
  // (e.g. const baseText = "Put your own text here! ";)

  // ---- Change this value to change the scrolling speed! ----
  const scrollSpeed = 7; // px per frame (higher = faster) <--- EDIT THIS LINE TO CHANGE SPEED
  // ---------------------------------------------------------

  const repeatTimes = 8;
  const scrollingText = Array.from({ length: repeatTimes })
    .map(() => baseText)
    .join("· ");

  React.useEffect(() => {
    if (count > 0 && !showText) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setShowText(true);
    }
  }, [count, showText]);

  // Animate text moving from right-to-left, starting from right edge
  React.useEffect(() => {
    if (!showText) return;
    let pos = window.innerWidth; // Start from the right-most part of viewport

    function animate() {
      if (textRef.current) {
        pos -= scrollSpeed; // <--- Use scrollSpeed variable
        // When the text has moved fully out left, reset to (right)
        if (pos < -textRef.current.offsetWidth) {
          pos = window.innerWidth;
        }
        textRef.current.style.transform = `translateX(${pos}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [showText, scrollSpeed]); // <-- optional: can include scrollSpeed for reactivity

  return showText ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "white",
      }}
    >
      {/* Background kiss.jpg image */}
      <img
        src="/kiss2.jpg"
        alt="Kiss"
        style={{
          position: "absolute",
          width: "100vw",
          height: "80vh",
          objectFit: "contain",
          zIndex: 0, // top z-index
          left: 0,
          bottom: 0,
          opacity: 0.7, // subtle background
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Scrolling red text above image */}
      <div
        ref={textRef}
        style={{
          color: "pink",
          fontWeight: "bold",
          fontSize: "60vh",
          whiteSpace: "nowrap",
          letterSpacing: 12,
          textShadow: "0px 2px 10px rgba(255,0,0,0.13)",
          userSelect: "none",
          willChange: "transform",
          zIndex: 1,
          position: "relative",
        }}
      >
        {scrollingText}
      </div>
    </div>
  ) : (
    <div
      style={{
        background: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          color: "pink",
          fontWeight: "bold",
          fontSize: "28vh",
          textAlign: "center",
        }}
      >
        {count}
      </span>
    </div>
  );
};

const FifthPage = () => {
  return (
    <div
      style={{
        color: "black",
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: "bold",
      }}
    >
      {/* 
        Where should you write the text?
        --> Write your message in the baseText variable in FifthPageContent above.
        How do you change the scrolling speed?
        --> Change the value of the scrollSpeed variable in FifthPageContent above.
      */}
      <FifthPageContent />
    </div>
  );
};

export default FifthPage;
