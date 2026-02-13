"use client";
import React, { useRef, useEffect, useState } from "react";

export default function NinePage() {
  const videoRef = useRef(null);

  // Use `undefined` initial state to avoid hydration mismatch
  const [muted, setMuted] = useState(undefined);
  const [videoError, setVideoError] = useState(false);

  // On mount, initialize muted state from localStorage (client only)
  useEffect(() => {
    // Default to muted: true if no preference stored
    const stored =
      typeof window !== "undefined"
        ? window.localStorage?.getItem("ninepage-muted")
        : null;
    const initMuted = stored === null ? true : stored === "true";
    setMuted(initMuted);
  }, []);

  // On mute state change, save to localStorage and mute the video
  useEffect(() => {
    if (muted === undefined) return; // Don't run until value is set
    if (typeof window !== "undefined" && videoRef.current) {
      videoRef.current.muted = muted;
      window.localStorage.setItem("ninepage-muted", String(muted));
    }
  }, [muted]);

  // Auto-play fix: re-attempt to play whenever mute state changes or ref connects
  useEffect(() => {
    if (muted === undefined) return;
    const tryPlay = () => {
      if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (!videoRef.current.muted) {
              videoRef.current.muted = true;
              setMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }
    };
    tryPlay();
  }, [muted]);

  // Reset video error state if src changes (optional - can be removed if src never changes)
  // useEffect(() => {
  //   setVideoError(false);
  // }, []);

  const handleMuteToggle = () => {
    if (muted !== undefined) {
      setMuted((prev) => !prev);
    }
  };

  // Until we know muted state from client, don't render the video to avoid hydration mismatch
  if (muted === undefined) return null;

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
          Sorry, the video can&apos;t be played.
          <br />
          Please check the file path, browser compatibility, or try refreshing
          the page.
        </div>
      )}
      <button
        onClick={handleMuteToggle}
        style={{
          position: "absolute",
          bottom: "2vw",
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
          top: "25%",
          right: "-6rem",
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
            fontSize: "1.1vw",
            fontWeight: 400,
            color: "#ffe1f0",
            textShadow: "0 0 18px #ee78ef",
            display: "block",
            marginTop: "1vw",
            textAlign: "justify",
            maxWidth: "58vw",
          }}
        >
          This was the first time in months that I&#39;ve seen you truly happy.
          I don&#39;t know why, but I could feel that inner child inside you
          again. Whenever I see this vedio, it makes me so happy watching you
          smile and play like a little kid. I&#39;ve missed you so much all
          these months, and I just want to spend time with that kiddo and enjoy
          every moment with her for my lifetime. I promise that this time I will
          protect that little spark and make sure that kiddo never disappears
          I&#39;ll do everything possible in my own ways to keep you smiling and
          safe.
        </span>
      </div>
    </div>
  );
}
