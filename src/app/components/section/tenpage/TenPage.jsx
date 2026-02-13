import React from "react";

const TenPage = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <video
        src="/vedio/laxmi.mov"
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          opacity: 0.8,
        }}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Text overlay on video */}
      <div
        style={{
          position: "absolute",
          top: "46%",
          left: "0",
          width: "100vw",
          color: "pink",

          //   textShadow: "2px 4px 12px #ea55b3, 0 0 12px pink",
          fontSize: "2.5vw",
          fontWeight: 700,
          fontFamily: "'Times New Roman', Times, serif",
          textAlign: "center",
          letterSpacing: "0.08em",
          zIndex: 2,
          userSelect: "none",
          pointerEvents: "none",
          padding: "1vw 5vw",
        }}
      >
        To my Laxmi, you will remain in my heart forever 🫶🏻.
      </div>
    </div>
  );
};

export default TenPage;
