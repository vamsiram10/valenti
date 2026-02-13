"use client";
import { useState, useRef } from "react";

export default function SixthPage() {
  const [opened, setOpened] = useState(false);
  const [animate, setAnimate] = useState(false);
  const imgRef = useRef(null);

  const handleOpen = () => {
    setAnimate(true);
    setTimeout(() => {
      setOpened(true);
      setAnimate(false);
    }, 700);
  };

  let content;
  if (!opened) {
    content = (
      <>
        <img
          ref={imgRef}
          src="/letter.jpeg"
          alt="Open Letter"
          style={{
            width: "80vw",
            height: "60vh",
            cursor: "pointer",
            background: "white",
            objectFit: "contain",
            zIndex: 10,
            position: "relative",
            transition: "filter 0.2s",
          }}
          className={animate ? "animated-letter" : ""}
          onClick={() => !animate && handleOpen()}
          draggable={false}
        />
        <div
          style={{
            marginTop: "2.5rem",

            fontSize: "2rem",
            color: "#fd397a",
            fontWeight: "bold",
            letterSpacing: "0.02em",
            userSelect: "none",
            textShadow: "0 1px 10px #fd397a22",
            zIndex: 11,
            textAlign: "center",
          }}
        >
          Letter For You My Love
        </div>
      </>
    );
  } else {
    content = (
      <div
        style={{
          background: "white",
          borderRadius: 24,
          boxShadow: "0 4px 32px #fd397a22",
          border: "2px solid #fd397a",
          padding: "54px 48px 54px 64px",
          minWidth: 700,
          minHeight: 600,
          position: "relative",
          maxWidth: "1000px",
          width: "80vw",
          maxHeight: "90vh",
          overflow: "hidden",
          fontFamily: "'Shadows Into Light', 'Caveat', cursive, sans-serif",
        }}
      >
        {/* Drawing pink lines */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 0,
            right: 0,
            bottom: 54,
            zIndex: 0,
          }}
        >
          {Array.from({ length: 15 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: 16,
                right: 16,
                top: `${idx * 32}px`,
                height: 1.5,
                background:
                  idx === 0
                    ? "transparent"
                    : "linear-gradient(90deg,#fd397a60 30%,#fd397a28 70%)",
              }}
            ></div>
          ))}
        </div>
        {/* Margin vertical pink guideline (classic notebook!) */}
        <div
          style={{
            position: "absolute",
            top: 53,
            left: 44,
            bottom: 54,
            width: 2,
            background: "linear-gradient(#fd397a66 90%,transparent)",
            zIndex: 1,
          }}
        />

        {/* My Valentine message, written here */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            background:
              "linear-gradient(135deg, rgba(255,217,234,0.52) 25%, rgba(221,242,253,0.11) 100%)",
            boxShadow:
              "0 12px 64px 6px rgba(250,80,168,0.10), 0 2px 16px 3px rgba(249,39,116,0.10) inset",
            backdropFilter: "blur(2.5px) saturate(1.22)",
            borderRadius: "24px 20px 18px 26px/22px 28px 18px 19px",
            border: "2.3px solid rgba(255,64,154,0.16)",
            width: "100%",
            height: "100%",
            fontFamily: "'Shadows Into Light', 'Caveat', cursive, sans-serif",
            fontSize: "1.35rem",
            color: "black",
            outline: "none",
            border: "none",
            paddingLeft: 0,
            paddingTop: 68,
            paddingRight: 4,
            lineHeight: "32px",
            letterSpacing: "0.03em",
            fontWeight: 500,
            whiteSpace: "pre-wrap",
          }}
        >
          {/* Add a round image at the top of the letter */}
          {/* Heading for the letter */}
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "2.1rem",
              color: "#d81b60",
              position: "absolute",
              top: "0px",
              right: "50px",
              fontFamily:
                "'Dancing Script', 'Pacifico', 'Shadows Into Light', 'Caveat', cursive, sans-serif",
              fontWeight: 200,
            }}
          >
            MY LETTER TO YOU
          </div>
          {/* Add a round image at the top of the letter */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              right: "5px",
              bottom: "16rem",
            }}
          >
            <img
              src="/vamp.png"
              alt="Valentine"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "50%",
                border: "3px solid #fd397a77",
                background: "#fff",
              }}
            />
          </div>
          My dearest Valentine,
          {"\n\n"}
          Roses are red,
          {"\n"}
          Violets are blue,
          {"\n"}
          Thank you for revealing your lovely hue.
          {"\n"}
          You make the sun rise brighter, and the stars seem a little closer
          too.
          {"\n\n"}
          Every day with you is filled with moments I treasure,
          {"\n"}
          I&apos;m so lucky I get to call you mine, today and forever.
          {"\n"}
          Happy Valentine’s Day, Pravalli! 💖
          {"\n\n"}
          Love,
          {"\n"}
          Vikram
        </div>
        {/* Optional: drawn heart in the letter */}
        <span
          style={{
            position: "absolute",
            bottom: 24,
            right: 42,
            fontSize: "1.4rem",
            zIndex: 5,
            opacity: 0.6,
            userSelect: "none",
          }}
        >
          ♥
        </span>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes letterOpen {
          0% {
            transform: scale(1) rotate(0deg);
            filter: brightness(1);
            opacity: 1;
          }
          40% {
            transform: scale(1.04) rotate(-1.5deg);
            filter: brightness(1.1) drop-shadow(0 0 24px #fd397a66);
            opacity: 0.99;
          }
          65% {
            transform: scale(0.96,1.02) rotate(2deg);
            filter: brightness(1.07) drop-shadow(0 0 44px #fd397a44);
            opacity: 0.98;
          }
          80% {
            transform: scale(1.1, 0.92) rotate(-2deg);
            filter: brightness(1.13) drop-shadow(0 0 10px #fd397a88);
            opacity: 1;
          }
          90% {
            transform: scale(1.04,1.04) rotate(0deg);
            filter: brightness(1) drop-shadow(0 0 0px transparent);
            opacity: 1;
          }
          100% {
            transform: scale(0.85,1.04) rotate(0deg) translateY(-38vh) scaleY(0.07);
            filter: brightness(1.05) blur(2px) grayscale(.35);
            opacity: 0;
          }
        }
        .animated-letter {
          animation: letterOpen 0.7s cubic-bezier(0.65, 0, 0.25, 1) forwards;
          will-change: transform, filter, opacity;
        }
      `}</style>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "white",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          flexDirection: "column",
        }}
      >
        {content}
      </div>
    </>
  );
}
