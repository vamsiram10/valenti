"use client";
import { useState } from "react";

const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 56;

const SecondPage = () => {
  const [noButtonPos, setNoButtonPos] = useState({ top: 40, left: 70 });
  const [yesClicked, setYesClicked] = useState(false);

  // Generate a position for the "No" button based on 100vw x 100vh, staying within bounds
  const getRandomPosition = () => {
    // Reserve some padding to avoid overlap with page edge
    const minX = 0 + 8;
    const minY = 0 + 8;
    const maxX = 100 - ((BUTTON_WIDTH + 16) / window.innerWidth) * 100;
    const maxY = 100 - ((BUTTON_HEIGHT + 16) / window.innerHeight) * 100;
    const left = Math.random() * (maxX - minX) + minX;
    const top = Math.random() * (maxY - minY) + minY;
    return { left, top };
  };

  const handleNoMouseEnter = () => {
    setNoButtonPos(getRandomPosition());
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    setNoButtonPos(getRandomPosition());
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  return (
    <div
      style={{
        color: "black",
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #000 70%, #fd397a 130%)",
        }}
      >
        <div
          style={{
            color: "pink",
            fontSize: "2.3rem",
            fontWeight: "bold",
            marginBottom: 38,
            textShadow: "0px 2px 16px rgba(253,57,122,0.18)",
            letterSpacing: 1,
          }}
        >
          {yesClicked ? "YAY! 💖" : "Will you be my Valentine?"}
        </div>
        {!yesClicked && (
          <div style={{ position: "relative", height: 80, width: 420 }}>
            <button
              onClick={handleYesClick}
              style={{
                padding: "18px 38px",
                fontSize: "1.2rem",
                borderRadius: 24,
                border: "none",
                background: "linear-gradient(90deg, #fd397a 45%, #fbc02d 130%)",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                marginRight: 48,
                boxShadow: "0 3px 18px 0 rgba(253,57,122,0.23)",
                transition: "transform 0.1s",
              }}
            >
              Yes
            </button>
          </div>
        )}
      </div>
      {/* "No" Button absolutely on the page within 100vw x 100vh */}
      {!yesClicked && (
        <button
          style={{
            position: "absolute",
            top: `${noButtonPos.top}vh`,
            left: `${noButtonPos.left}vw`,
            padding: "18px 38px",
            fontSize: "1.2rem",
            borderRadius: 24,
            border: "none",
            background: "linear-gradient(90deg, #222 45%, #fd397a 120%)",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            transition: "top 0.2s, left 0.2s, transform 0.12s",
            userSelect: "none",
            zIndex: 10,
            minWidth: BUTTON_WIDTH,
            minHeight: BUTTON_HEIGHT,
          }}
          onMouseEnter={handleNoMouseEnter}
          onClick={handleNoClick}
          tabIndex={-1}
        >
          No
        </button>
      )}
      <img
        src="/cat1.jpg"
        alt="Cat on bottom left"
        style={{
          position: "absolute",
          left: 60,
          bottom: 0,
          width: "400px",
          height: "auto",
          zIndex: 9,
          pointerEvents: "none",
        }}
      />
      {/* <img
        src="/cat2.png"
        alt="Cat in the middle bottom"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 0,
          transform: "translateX(-50%)",
          width: "200px",
          height: "auto",
          zIndex: 9,
          pointerEvents: "none",
        }}
      /> */}
    </div>
  );
};

export default SecondPage;
