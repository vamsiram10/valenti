"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Helper to generate a heart SVG
const HeartSVG = ({ size = 34, color = "#fd85b3", style = {} }) => (
  <svg
    viewBox="0 0 44 40"
    width={size}
    height={size}
    style={{
      display: "block",
      ...style,
    }}
  >
    <path
      d="M32.5 2.5c-4 0-6.5 3-7.6 4.7C23.8 5.5 21.1 2.5 17.5 2.5 12.1 2.5 8 6.7 8 13.1c0 7.1 6.3 11.5 21 23.9 14.7-12.5 21-16.8 21-23.9C44 6.7 39.9 2.5 34.5 2.5z"
      fill={color}
      stroke="#fff"
      strokeWidth="2"
    />
  </svg>
);

// Gift Button Wrapper - for accessibility and clear semantics
const GiftBoxButton = ({ children, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="gift-box-button"
    tabIndex={0}
    aria-label={label}
    style={{
      background: "none",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer",
      outline: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transition: "transform 0.1s",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
    }}
  >
    {children}
  </button>
);

// Enhanced: allow label on front face (deg=0) of the cube
const ValentineGiftBox = ({
  size = 120,
  spinName = "valentineSpin1",
  animationDuration = "4s",
  bowColor = "#fd85b3",
  ribbonColor = "transparent",
  heartColor = "#fd85b3",
  name = "",
  onClick = () => {},
}) => {
  // All sides gradient with soft valentine colors
  const sideGradient = "linear-gradient(135deg, #fd85b3 60%, #ffb1bc 100%)";

  // Heart pattern as SVG background encoded as data URL
  const heartPatternDataUrl = encodeURIComponent(`
    <svg width="44" height="40" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.5 2.5c-4 0-6.5 3-7.6 4.7C23.8 5.5 21.1 2.5 17.5 2.5 12.1 2.5 8 6.7 8 13.1c0 7.1 6.3 11.5 21 23.9 14.7-12.5 21-16.8 21-23.9C44 6.7 39.9 2.5 34.5 2.5z" fill="${heartColor}" stroke="#fff" stroke-width="1"/>
    </svg>
  `);

  const heartPatternBg = `url("data:image/svg+xml,${heartPatternDataUrl}") repeat`;

  return (
    <GiftBoxButton onClick={onClick} label={name ? name : "Valentine Gift"}>
      <div style={{ perspective: 700 }}>
        <div
          style={{
            width: size,
            height: size,
            position: "relative",
            transformStyle: "preserve-3d",
            animation: `${spinName} ${animationDuration} linear infinite`,
            pointerEvents: "none", // ⭐ THIS FIXES IT
          }}
        >
          {/* Sides (front has label, others just heart pattern) */}
          {[0, 180, 90, -90].map((deg, idx) => (
            <div
              key={deg}
              style={{
                position: "absolute",
                width: `${size}px`,
                height: `${size}px`,
                // Do not use 'background' shorthand with backgroundSize.
                backgroundImage: `${sideGradient}, ${heartPatternBg}`,
                backgroundPosition: "0 0, 0 0",
                backgroundRepeat: "no-repeat, repeat",
                backgroundSize: "100% 100%, 20% auto",
                border: "4px solid #fff",
                borderRadius: 16,
                boxShadow: "0 7px 40px #fd85b333",
                transform: `rotateY(${deg}deg) translateZ(${size / 2}px)`,
                overflow: "hidden",
                display: deg === 0 ? "flex" : undefined,
                alignItems: deg === 0 ? "center" : undefined,
                justifyContent: deg === 0 ? "center" : undefined,
              }}
            >
              {/* Show the label only on the front side (deg === 0) */}
              {deg === 0 && name && (
                <span
                  style={{
                    fontSize: Math.round(size * 0.22),
                    color: "#fff",
                    fontWeight: 900,
                    textShadow:
                      "0 2px 16px #fd85b399, 0 1px 1px #fd2570, 0 0 1px #fff",
                    userSelect: "none",
                    letterSpacing: "2px",
                    fontFamily: 'inherit, "Segoe UI", sans-serif',
                    // Optional label background for readability
                    background: "rgba(255, 133, 179, 0.24)",
                    padding: "0.19em 0.65em",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px #fd85b328",
                  }}
                >
                  {name}
                </span>
              )}
            </div>
          ))}
          {/* Top with hearts */}
          <div
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              background: `linear-gradient(90deg, #fff5fa 60%, #fd85b3 130%)`,
              border: "4px solid #fff",
              borderRadius: "18px 18px 10px 10px",
              transform: `rotateX(90deg) translateZ(${size / 2}px)`,
              boxShadow: "0 15px 25px 0 #fd85b370",
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              overflow: "hidden",
            }}
          >
            {/* Central Heart */}
            <HeartSVG
              size={Math.round(size * 0.45)}
              color="#ff3e82"
              style={{
                position: "absolute",
                top: "27%",
                left: "27%",
                filter: "drop-shadow(0 0 8px #fd85b375)",
                zIndex: 4,
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
                transform: "scale(1.10) rotate(-8deg)",
              }}
            />
            {/* Small hearts in corners */}
            <HeartSVG
              size={22}
              color="#ffb6d9"
              style={{
                position: "absolute",
                left: 8,
                top: 8,
                opacity: 0.82,
                filter: "drop-shadow(0 1px 6px #ffe0ef)",
                transition: "transform 0.18s",
              }}
            />
            <HeartSVG
              size={20}
              color="#ffd2e7"
              style={{
                position: "absolute",
                right: 8,
                top: 12,
                opacity: 0.75,
                filter: "drop-shadow(0 1px 7px #ffd8ea)",
                transform: "rotate(12deg) scale(1.06)",
                transition: "transform 0.18s",
              }}
            />
            <HeartSVG
              size={21}
              color="#ffbbdc"
              style={{
                position: "absolute",
                left: 12,
                bottom: 8,
                opacity: 0.8,
                filter: "drop-shadow(0 1.5px 8px #ffcbe8)",
                transform: "rotate(-11deg) scale(0.98)",
                transition: "transform 0.18s",
              }}
            />
            <HeartSVG
              size={20}
              color="#ffe4f2"
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                opacity: 0.7,
                filter: "drop-shadow(0 1px 8px #ffdff1)",
                transform: "rotate(8deg) scale(1.02)",
                transition: "transform 0.18s",
              }}
            />
          </div>
          {/* Bottom (simple soft pink) */}
          <div
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size}px`,
              background: "linear-gradient(135deg,#fd85b3 60%,#fff0f7 120%)",
              border: "4px solid #fff",
              borderRadius: "10px 10px 18px 18px",
              transform: `rotateX(-90deg) translateZ(${size / 2}px)`,
              zIndex: 1,
            }}
          />
          {/* Bow composed of hearts */}
          <div
            style={{
              position: "absolute",
              top: -Math.round(size * 0.24),
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {/* Left heart bow */}
            <HeartSVG
              size={Math.round(size * 0.28)}
              color={bowColor}
              style={{
                transform: "rotate(-32deg)",
                filter: "drop-shadow(0px 2px 5px #fd85b388)",
                position: "relative",
                left: -Math.round(size * 0.12),
                top: 8,
              }}
            />
            {/* Center heart knot */}
            <HeartSVG
              size={Math.round(size * 0.17)}
              color={bowColor}
              style={{
                margin: "0 8px",
                filter: "drop-shadow(0px 1.5px 4px #fd85b377)",
                position: "relative",
                top: 0,
              }}
            />
            {/* Right heart bow */}
            <HeartSVG
              size={Math.round(size * 0.28)}
              color={bowColor}
              style={{
                transform: "rotate(32deg)",
                filter: "drop-shadow(0px 2px 5px #fd85b388)",
                position: "relative",
                right: -Math.round(size * 0.12),
                top: 8,
              }}
            />
          </div>
        </div>
      </div>
    </GiftBoxButton>
  );
};

const FourthPage = () => {
  const router = useRouter();

  // When Gift 1 is clicked, use router.push for navigation, and log to console
  const handleGift1Click = () => {
    console.log("Gift 1 clicked");
    router.push("/sixthpage");
  };

  const handleGiftClick = (which) => {
    alert(`You clicked ${which}!`);
  };

  return (
    <div
      style={{
        color: "black",
        backgroundColor: "pink",
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
      <div style={{ display: "flex", gap: "10vw" }}>
        <ValentineGiftBox
          size={120}
          spinName="valentineSpin1"
          animationDuration="4s"
          bowColor="#fd85b3"
          ribbonColor="#fff"
          heartColor="#fd85b3"
          name="Gift 1"
          onClick={handleGift1Click}
        />
        <ValentineGiftBox
          size={120}
          spinName="valentineSpin2"
          animationDuration="4.3s"
          bowColor="#ffb1bc"
          ribbonColor="#fdf1f7"
          heartColor="#ffb1bc"
          name="Gift 2"
          onClick={() => handleGiftClick("Gift 2")}
        />
        <ValentineGiftBox
          size={120}
          spinName="valentineSpin3"
          animationDuration="3.7s"
          bowColor="#ffc8dc"
          ribbonColor="#fff7fa"
          heartColor="#ffc8dc"
          name="Gift 3"
          onClick={() => handleGiftClick("Gift 3")}
        />
        <style>
          {`
          @keyframes valentineSpin1 {
            0% { transform: rotateY(6deg) rotateX(-13deg) rotateZ(-3deg);}
            100% { transform: rotateY(366deg) rotateX(-13deg) rotateZ(-3deg);}
          }
          @keyframes valentineSpin2 {
            0% { transform: rotateY(-25deg) rotateX(10deg) rotateZ(5deg);}
            100% { transform: rotateY(335deg) rotateX(10deg) rotateZ(5deg);}
          }
          @keyframes valentineSpin3 {
            0% { transform: rotateY(18deg) rotateX(-17deg) rotateZ(-7deg);}
            100% { transform: rotateY(378deg) rotateX(-17deg) rotateZ(-7deg);}
          }
        `}
        </style>
      </div>
    </div>
  );
};

export default FourthPage;
