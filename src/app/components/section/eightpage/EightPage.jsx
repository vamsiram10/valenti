"use client";
import React, { useRef, useEffect, useState } from "react";

// Preloader Component
const Preloader = ({ onClick }) => (
  <div
    style={{
      width: "100vw",
      height: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      top: 0,
      left: 0,
      zIndex: 9999,
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    <img
      src="marry.jpeg"
      alt="preloader"
      style={{
        maxWidth: "70vw",
        maxHeight: "80vh",
        cursor: "pointer",
        userSelect: "none",
        marginBottom: "2rem",
      }}
      draggable={false}
    />
    <span
      style={{
        color: "pink",
        fontSize: "1.5rem",
        fontWeight: 700,

        fontFamily: "'Times New Roman', Times, serif",

        whiteSpace: "nowrap",
        zIndex: 99999,
        userSelect: "none",
      }}
    >
      Click on YES if you agree
    </span>
  </div>
);

const images = [
  // Load images in /public/slide*.jpg using dynamic import

  "slide/1.jpeg",
  "slide/2.jpg",
  "slide/3.jpeg",
  "slide/4.jpeg",
  "slide/5.jpeg",
  "slide/6.jpeg",
  "slide/7.jpeg",
  "slide/8.jpeg",
  "slide/9.jpeg",
  // Add more image paths if needed
];

const SLIDE_DURATION = 60000; // ms for 1 full scroll left-to-right
const DRAG_SCROLL_RATIO = 1.35; // Adjust drag speed feel

const EightPage = () => {
  const [visible, setVisible] = useState(false); // Whether to show page or preloader

  // Only mount slider if visible
  const scrollRef = useRef(null);
  const [animating, setAnimating] = useState(true);
  const [dragInfo, setDragInfo] = useState({
    active: false,
    lastX: 0,
    offset: 0,
  });
  const [trackX, setTrackX] = useState(0);

  // Reference to requestAnimationFrame for smooth scroll on drag
  const rafRef = useRef();

  // For infinite loop, duplicate images
  const imagesToShow = [...images, ...images];

  // Total width of slider track (vw units -> px conversion needed if you scroll by px)
  const SLIDE_WIDTH_VW = 36; // image+margin per image
  const TRACK_TOTAL_VW = imagesToShow.length * SLIDE_WIDTH_VW;

  // Convert vw to px (for desktop, get 1vw pixel size)
  function getVwInPx() {
    if (typeof window === "undefined") return 1;
    return window.innerWidth / 100;
  }

  // Handle mouse + touch drag to move images
  useEffect(() => {
    if (!visible) return; // Don't set event listeners etc. if preloader showing
    const scroller = scrollRef.current;
    if (!scroller) return;

    // Pause/Resume on hover, but also on drag, always animate except while drag active
    const handleMouseEnter = () => {
      if (!dragInfo.active) setAnimating(false);
    };
    const handleMouseLeave = () => {
      if (!dragInfo.active) setAnimating(true);
    };

    scroller.addEventListener("mouseenter", handleMouseEnter);
    scroller.addEventListener("mouseleave", handleMouseLeave);

    // Mouse and touch drag handlers
    const handlePointerDown = (e) => {
      e.preventDefault();
      setAnimating(false);
      setDragInfo((prev) => ({
        ...prev,
        active: true,
        lastX: e.type === "touchstart" ? e.touches[0].clientX : e.clientX,
      }));
    };

    const handlePointerMove = (e) => {
      if (!dragInfo.active) return;
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const dx = clientX - dragInfo.lastX;
      let nOffset = dragInfo.offset + dx * DRAG_SCROLL_RATIO;

      // Infinite wrap
      const trackPx = TRACK_TOTAL_VW * getVwInPx();
      if (nOffset > 0) nOffset -= trackPx / 2;
      if (nOffset < -trackPx / 2) nOffset += trackPx / 2;

      setTrackX(nOffset);
      setDragInfo((prev) => ({
        ...prev,
        lastX: clientX,
        offset: nOffset,
      }));
    };

    const handlePointerUp = () => {
      setAnimating(true);
      setDragInfo((prev) => ({ ...prev, active: false }));
    };

    // Attach both mouse & touch
    scroller.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);

    scroller.addEventListener("touchstart", handlePointerDown, {
      passive: false,
    });
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      scroller.removeEventListener("mouseenter", handleMouseEnter);
      scroller.removeEventListener("mouseleave", handleMouseLeave);

      scroller.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);

      scroller.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
    // We use dragInfo in deps to respond
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragInfo, visible]);

  // If animating, advance the track "manually" to mimic CSS infinite loop
  useEffect(() => {
    if (!visible) return; // Don't animate while preloader
    if (!animating) {
      // If drag gesture, do not animate
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let lastTime = performance.now();
    function animate() {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      // The amount to move per ms (full width in SLIDE_DURATION ms)
      const trackPx = TRACK_TOTAL_VW * getVwInPx();
      const speedPxPerMs = trackPx / 2 / SLIDE_DURATION;

      setDragInfo((prev) => {
        // Only animate if not dragging
        if (!prev.active) {
          let nOffset = prev.offset - speedPxPerMs * dt;
          // Infinite wrap
          if (nOffset < -trackPx / 2) nOffset += trackPx / 2;
          setTrackX(nOffset);
          return { ...prev, offset: nOffset };
        }
        return prev;
      });

      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animating, TRACK_TOTAL_VW, visible]);

  // Calculate transform:translateX for the track
  const trackStyle = {
    width: `${imagesToShow.length * SLIDE_WIDTH_VW}vw`,
    transform: `translateX(${trackX}px)`,
    transition:
      dragInfo.active || !animating ? "none" : "transform 0.16s linear",
    cursor: dragInfo.active ? "grabbing" : "grab",
  };

  // If not visible, render preloader
  if (!visible) {
    return <Preloader onClick={() => setVisible(true)} />;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "white",
        overflow: "hidden",
        display: "flex",

        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflowX: "hidden",
        touchAction: "pan-y",
        userSelect: dragInfo.active ? "none" : undefined,
      }}
    >
      <style>
        {`
          .eightpage-slider-track {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 60vh;
            /* No animation, our JS handles it */
          }
          .eightpage-slide-img {
            height: 55vh;
            width: 32vw;
            min-width: 32vw;
            max-width: 32vw;
            margin: 0 2vw;          
            object-fit: contain;
            object-position: center center;
            user-select: none;
            pointer-events: none;
            aspect-ratio: 3/4;
          }
          @media (max-width: 750px) {
            .eightpage-slide-img {
              height: 32vh;
              width: 52vw;
              min-width: 52vw;
              max-width: 52vw;
              aspect-ratio: 3/4;
            }
            .eightpage-slider-track {
              height: 33vh;
            }
          }
        `}
      </style>

      {/* Slider wrapper with overflow */}
      <div
        ref={scrollRef}
        style={{
          width: "100vw",
          height: "60vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          position: "relative",
          touchAction: "pan-y",
          userSelect: dragInfo.active ? "none" : undefined,
          cursor: dragInfo.active ? "grabbing" : "grab",
        }}
      >
        {/* Sliding track, handled via transform by JS */}
        <div className="eightpage-slider-track" style={trackStyle}>
          {imagesToShow.map((img, idx) => (
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="eightpage-slide-img"
              draggable={false}
              key={idx}
            />
          ))}
        </div>
      </div>
      {/* Optional: Overlay label */}
      <div
        style={{
          position: "absolute",
          bottom: "4vh",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.82)",
          color: "pink",
          fontWeight: 500,
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: "1.2rem",
          letterSpacing: "0.04em",
          padding: "0.4em 1.7em",

          userSelect: "none",
        }}
      >
        I don’t know how, but I really want our story to end with you like this
      </div>
    </div>
  );
};

export default EightPage;
