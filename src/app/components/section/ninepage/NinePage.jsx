"use client";
import React, { useRef, useEffect, useState } from "react";

export default function NinePage() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(() => {
    // Try to get previous state from localStorage on first render (client only)
    if (typeof window !== "undefined") {
      return window.localStorage?.getItem("ninepage-muted") === "true";
    }
    return true;
  });
  const [videoError, setVideoError] = useState(false);

  // Update localStorage and video muted status on change
  useEffect(() => {
    if (typeof window !== "undefined" && videoRef.current) {
      videoRef.current.muted = muted;
      window.localStorage.setItem("ninepage-muted", String(muted));
    }
  }, [muted]);

  // Auto-play fix: re-attempt to play whenever mute state changes or ref connects
  useEffect(() => {
    const tryPlay = () => {
      if (videoRef.current) {
        // It's best to try play after muted has been applied, especially for autoplay restrictions
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If autoplay is blocked, try to mute and re-play
            if (!videoRef.current.muted) {
              videoRef.current.muted = true;
              setMuted(true);
              videoRef.current.play().catch(() => {}); // Silent fail
            }
          });
        }
      }
    };
    tryPlay();
  }, [muted]);

  // Reset video error state if src changes
  useEffect(() => {
    setVideoError(false);
  }, []);

  const handleMuteToggle = () => {
    setMuted((prev) => !prev);
  };

  return (
    <div
      style={{
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "pink",
        position: "relative",
      }}
    >
      <video
        ref={videoRef}
        src="/vedio/pravs.MP4"
        autoPlay
        loop
        playsInline
        muted={muted}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
          zIndex: 0,
          backgroundColor: "pink",
        }}
        onError={() => setVideoError(true)}
        controls={videoError}
      />
      {videoError && (
        <div
          style={{
            position: "absolute",
            top: "42%",
            left: "10vw",
            width: "80vw",
            background: "rgba(255,255,255,0.85)",
            color: "#ee7899",
            fontWeight: "bold",
            fontSize: "2vw",
            borderRadius: "1vw",
            padding: "2vw",
            textAlign: "center",
            zIndex: 20,
            boxShadow: "0 2px 24px rgba(238,120,153,0.22)",
          }}
        >
          Sorry, the video can't be played.
          <br />
          Please check the file path, browser compatibility, or try refreshing
          the page.
        </div>
      )}
      <button
        onClick={handleMuteToggle}
        style={{
          position: "absolute",
          top: "2vw",
          right: "2vw",
          zIndex: 9,
          background: "rgba(255,255,255,0.8)",
          color: "#ee7899",
          fontWeight: "bold",
          fontSize: "1.3vw",
          border: "none",
          borderRadius: "1vw",
          padding: "0.7vw 1.7vw",
          boxShadow: "0 2px 8px rgba(238,120,153,0.18)",
          cursor: "pointer",
          transition: "background 0.18s",
        }}
      >
        {muted ? "Unmute" : "Mute"}
      </button>
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "55rem",
          width: "30vw",
          textAlign: "justify",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 2,
          color: "#fff",
          textShadow: "2px 4px 12px #ee7899, 0 0 12px pink",
          fontSize: "2vw",
          fontWeight: 700,
          fontFamily: "'Varela Round', 'Comic Sans MS', cursive, sans-serif",
          letterSpacing: "0.08em",
          pointerEvents: "none",
          userSelect: "none",
          padding: "1vw 8vw", // give padding to the left for nicer view
        }}
      >
        My Forever Valentine 💖
        <br />
        <span
          style={{
            fontSize: "1vw",
            fontWeight: 400,
            color: "#ffe1f0",
            textShadow: "0 0 18px #ee78ef",
            display: "block",
            marginTop: "1vw",
            textAlign: "justify",
            maxWidth: "58vw",
          }}
        >
          This was the first time in months that I’ve seen you truly happy. I
          don’t know why, but I could feel that inner child inside you again.
          Whenever I see this vedio, it makes me so happy watching you smile and
          play like a little kid. I’ve missed you so much all these months, and
          I just want to spend time with that kiddo and enjoy every moment with
          her for my lifetime. I promise that this time I will protect that
          little spark and make sure that kiddo never disappears I’ll do
          everything possible in my own ways to keep you smiling and safe.
        </span>
      </div>
    </div>
  );
}
