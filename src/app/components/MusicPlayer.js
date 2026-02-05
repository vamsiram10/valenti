"use client";
import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  // Hide popup after 2.5 seconds automatically
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const buttonSize = 60;
  const buttonRight = 20;
  const buttonBottomOffsetVH = 90; // was "bottom: 90%" => "10vh" from bottom

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/pravalliaudio.m4a" type="audio/mpeg" />
      </audio>

      {/* Music button (on top) */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed",
          bottom: `${buttonBottomOffsetVH}vh`,
          right: `${buttonRight}px`,
          zIndex: 9999,
          background: "black",
          color: "white",
          borderRadius: "50%",
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "100%",
            height: "80%",
            background: "pink",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
          }}
        >
          <span role="img" aria-label={playing ? "Sound On" : "Sound Off"}>
            {playing ? "🎶" : "🔇"}
          </span>
        </span>
      </button>

      {/* Popup below the button */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            // Centered below the button
            right: `${buttonRight + buttonSize / 2 - 36}px`, // 36px = half popup width approx
            bottom: `calc(${buttonBottomOffsetVH}vh - ${buttonSize + 12}px)`, // 12px gap below button
            background: "white",
            color: "black",
            borderRadius: "12px",
            padding: "2px 13px",
            zIndex: 10000,
            fontSize: "1rem",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
            fontWeight: 500,
            textAlign: "center",
            letterSpacing: "0.3px",
            minWidth: "65px",
            cursor: "pointer",
            opacity: 0.93,
            transition: "opacity 0.22s",
            // subtle nudge up animation on show (bounce up)
            animation: "popup-bounce-down 0.34s",
            userSelect: "none",
            pointerEvents: "auto",
          }}
          onClick={() => setShowPopup(false)}
        >
          My favorite song, sung by my favorite person.
          {playing ? "pause" : "play"} 🎶
        </div>
      )}

      {/* Add keyframes for gentle bounce effect */}
      <style>{`
        @keyframes popup-bounce-down {
          0% { transform: translateY(-18px); opacity: 0; }
          55% { transform: translateY(4px); opacity: 1;}
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
