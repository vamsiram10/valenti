"use client";
import React from "react";

// Instructions:
// - Where should I write the text? Write your text in the `baseText` variable inside the FifthPageContent component below.
// - How do I change the scrolling speed? Change the value of the `scrollSpeed` variable (measured in pixels per frame, higher = faster).

const FifthPageContent = () => {
  const [count, setCount] = React.useState(25); // Set initial countdown
  const [showText, setShowText] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const textRef = React.useRef(null);
  const animationRef = React.useRef(0);

  // Track if the page is fully open/visible (not minimized or in background)
  const [pageVisible, setPageVisible] = React.useState(true);

  // Write your desired text here:
  const baseText =
    "You Are My Favourite Girl And I Love You So So So Much ...... ";

  // ---- Change this value to change the scrolling speed! ----
  const scrollSpeed = 13; // px per frame (higher = faster)
  // ---------------------------------------------------------

  const repeatTimes = 8;
  const scrollingText = Array.from({ length: repeatTimes })
    .map(() => baseText)
    .join("· ");

  // Only start the countdown when the page is actually mounted
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen for page visibility (tab minimized/not visible) to pause/resume countdown
  React.useEffect(() => {
    function handleVisibilityChange() {
      setPageVisible(document.visibilityState === "visible");
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Countdown only runs if page is visible and mounted
  React.useEffect(() => {
    if (!isMounted) return;
    if (!pageVisible) return; // Pause countdown if page isn't fully open
    if (count > 0 && !showText) {
      const timer = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setShowText(true);
    }
  }, [count, showText, isMounted, pageVisible]);

  // Animate text moving from right-to-left, starting from right edge
  React.useEffect(() => {
    if (!showText) return;
    let pos = window.innerWidth;

    function animate() {
      if (textRef.current) {
        pos -= scrollSpeed;
        if (pos < -textRef.current.offsetWidth) {
          pos = window.innerWidth;
        }
        textRef.current.style.transform = `translateX(${pos}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [showText, scrollSpeed]);

  // If not yet shown text, show counter and message
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
          zIndex: 0,
          left: 0,
          bottom: 0,
          opacity: 0.7,
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
        flexDirection: "column",
      }}
    >
      <span
        style={{
          color: "pink",
          fontWeight: "bold",
          fontSize: "2vh",
          textAlign: "center",
          marginBottom: "2vh",
        }}
      >
        Before Going To Next Page Wait & Watch Kido
      </span>
      <span
        style={{
          color: "pink",
          fontWeight: "bold",
          fontSize: "28vh",
          textAlign: "center",
          lineHeight: "1",
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
      <FifthPageContent />
    </div>
  );
};

export default FifthPage;
