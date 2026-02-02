"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const BUTTON_WIDTH = 150;
const BUTTON_HEIGHT = 56;
const SHATTER_PIECES = 12; // Number of shatter pieces

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const SecondPage = () => {
  const router = useRouter();

  const [noButtonPos, setNoButtonPos] = useState({ top: 15, left: 1 });
  const [yesClicked, setYesClicked] = useState(false);
  const [shatter, setShatter] = useState(false);
  const [showNo, setShowNo] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const buttonBarRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const getRandomPosition = () => {
    const padding = 8;
    const bar = buttonBarRef.current;
    let width = 350,
      height = 80;
    if (bar) {
      const barRect = bar.getBoundingClientRect();
      width = barRect.width;
      height = barRect.height;
    }
    const minX = padding;
    const minY = padding;
    const maxX = 100 - ((BUTTON_WIDTH + padding * 2) / width) * 100;
    const maxY = 100 - ((BUTTON_HEIGHT + padding * 2) / height) * 100;
    const rand1 = Math.random(),
      rand2 = Math.random();
    const left = rand1 * (maxX - minX) + minX;
    const top = rand2 * (maxY - minY) + minY;
    return { left, top };
  };

  useEffect(() => {
    if (yesClicked || shatter || !hasMounted) return;
    function handleMouseMove(e) {
      const buttonBar = buttonBarRef.current;
      if (!buttonBar) return;

      const barRect = buttonBar.getBoundingClientRect();
      const btnLeft = barRect.left + (noButtonPos.left / 100) * barRect.width;
      const btnTop = barRect.top + (noButtonPos.top / 100) * barRect.height;

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const btnCenterX = btnLeft + BUTTON_WIDTH / 2;
      const btnCenterY = btnTop + BUTTON_HEIGHT / 2;

      const safeRadius = 110;

      const dx = cursorX - btnCenterX;
      const dy = cursorY - btnCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < safeRadius) {
        const angle = Math.atan2(dy, dx);
        const padding = 8;
        const minX = padding;
        const minY = padding;
        const maxX = 100 - ((BUTTON_WIDTH + padding * 2) / barRect.width) * 100;
        const maxY =
          100 - ((BUTTON_HEIGHT + padding * 2) / barRect.height) * 100;

        const jumpDistance = 30;
        let newLeft = noButtonPos.left - Math.cos(angle) * jumpDistance;
        let newTop = noButtonPos.top - Math.sin(angle) * jumpDistance;

        newLeft = Math.max(minX, Math.min(maxX, newLeft));
        newTop = Math.max(minY, Math.min(maxY, newTop));

        const absBtnLeft = barRect.left + (newLeft / 100) * barRect.width;
        const absBtnTop = barRect.top + (newTop / 100) * barRect.height;
        const newDist = Math.sqrt(
          (cursorX - (absBtnLeft + BUTTON_WIDTH / 2)) ** 2 +
            (cursorY - (absBtnTop + BUTTON_HEIGHT / 2)) ** 2
        );
        if (newDist < safeRadius * 0.8 && hasMounted) {
          setNoButtonPos(getRandomPosition());
        } else {
          setNoButtonPos({ left: newLeft, top: newTop });
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
    // eslint-disable-next-line
  }, [noButtonPos, yesClicked, shatter]);

  // On click YES, go to FourthPage immediately
  const handleYesClick = (e) => {
    e?.preventDefault?.();
    setYesClicked(true);
    // Use router.push for client navigation
    setTimeout(() => {
      router.push("/fourthpage");
    }, 400);
  };

  const handleNoMouseEnter = () => {
    if (hasMounted) setNoButtonPos(getRandomPosition());
  };

  const handleNoClick = (e) => {
    e.preventDefault();
    setShatter(true);
    setTimeout(() => {
      setShowNo(false);
    }, 800);
  };

  const [shatterSeed, setShatterSeed] = useState(0);
  useEffect(() => {
    if (shatter) {
      setShatterSeed(Date.now());
    }
  }, [shatter]);

  const renderShatter = () => {
    const baseSeed = shatter ? shatterSeed : 0;
    const rand = seededRandom(baseSeed);
    const pieces = [];
    for (let i = 0; i < SHATTER_PIECES; i++) {
      const angle = (360 / SHATTER_PIECES) * i;
      const rad = (angle * Math.PI) / 180;
      const translate = shatter ? 80 + rand() * 70 : 80;
      const rotate = shatter ? (rand() - 0.5) * 90 : 0;
      const delay = shatter ? rand() * 0.08 : 0;
      const scale = shatter ? 0.85 + rand() / 2 : 1;
      const pieceWidth = (BUTTON_WIDTH / SHATTER_PIECES) * 1.5;
      const pieceHeight = BUTTON_HEIGHT / 2 + (shatter ? rand() * 12 : 0);

      pieces.push(
        <span
          key={i}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: pieceWidth,
            height: pieceHeight,
            background: "linear-gradient(90deg,#222 40%,#fd397a 110%)",
            boxShadow: "0 1px 8px #fd397a60",
            borderRadius: 8,
            color: "#fff",
            display: "block",
            padding: 0,
            fontWeight: 700,
            opacity: shatter ? 0.85 : 0,
            zIndex: 30,
            transition: `transform 0.7s cubic-bezier(.21,1.15,.54,.99) ${delay}s, opacity 0.4s ${delay}s`,
            transform: shatter
              ? `translate(-50%,-50%) translate(${
                  Math.cos(rad) * translate
                }px, ${
                  Math.sin(rad) * translate
                }px) rotate(${rotate}deg) scale(${scale})`
              : "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              fontSize: "0.9rem",
              fontWeight: 700,
              lineHeight: "32px",
              color: "#fff",
              userSelect: "none",
              opacity: "0.9",
              letterSpacing: 2,
              textShadow: "0 1px 5px #fd397a44",
            }}
          >
            {i === Math.floor(SHATTER_PIECES / 2)
              ? "N"
              : i === Math.floor(SHATTER_PIECES / 2) + 1
              ? "O"
              : ""}
          </span>
        </span>
      );
    }
    return pieces;
  };

  return (
    <div
      style={{
        color: "pink",
        backgroundColor: "white",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          right: "7%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          minHeight: "220px",
          zIndex: 5,
          width: "auto",
        }}
      >
        <div
          style={{
            color: "pink",
            fontSize: "4.5rem",
            fontWeight: "bold",
            marginBottom: 38,
            letterSpacing: 1,
            lineHeight: 1.13,
            textShadow: "0px 2px 16px rgba(253,57,122,0.10)",
            minWidth: 0,
            whiteSpace: "nowrap",
            textAlign: "right",
          }}
        >
          {yesClicked ? (
            <span>YAY! 💖 hehe🤭</span>
          ) : (
            <span>Will you be my Valentine?</span>
          )}
        </div>

        {!yesClicked && (
          <div
            ref={buttonBarRef}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              height: 80,
              width: 350,
              justifyContent: "flex-end",
              position: "relative",
            }}
          >
            {/* Yes Button - Always on the right */}
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
                marginRight: 0,
                marginLeft: 16,
                boxShadow: "0 3px 18px 0 rgba(253,57,122,0.23)",
                transition: "transform 0.1s",
                position: "relative",
                zIndex: 12,
                minWidth: BUTTON_WIDTH,
                minHeight: BUTTON_HEIGHT,
              }}
            >
              Yes
            </button>
            {/* No Button - shatters and disappears on click! */}
            {showNo && (
              <div
                style={{
                  position: "absolute",
                  top: `${noButtonPos.top}%`,
                  left: `${noButtonPos.left}%`,
                  minWidth: BUTTON_WIDTH,
                  minHeight: BUTTON_HEIGHT,
                  width: BUTTON_WIDTH,
                  height: BUTTON_HEIGHT,
                  pointerEvents: shatter ? "none" : "auto",
                  zIndex: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Button itself */}
                <button
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "18px 38px",
                    fontSize: "1.2rem",
                    borderRadius: 24,
                    border: "none",
                    background:
                      "linear-gradient(90deg, #222 45%, #fd397a 120%)",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition:
                      "opacity 0.25s, top 0.12s, left 0.12s, transform 0.12s",
                    userSelect: "none",
                    zIndex: 14,
                    minWidth: BUTTON_WIDTH,
                    minHeight: BUTTON_HEIGHT,
                    opacity: shatter ? 0 : 1,
                    pointerEvents: shatter ? "none" : "auto",
                  }}
                  onMouseEnter={handleNoMouseEnter}
                  onClick={handleNoClick}
                  tabIndex={-1}
                  disabled={shatter}
                >
                  No
                </button>
                {/* Shatter overlay */}
                <div
                  style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: BUTTON_WIDTH,
                    height: BUTTON_HEIGHT,
                    zIndex: 32,
                  }}
                  aria-hidden="true"
                >
                  {renderShatter()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Bottom left image (kept as is) */}
      <img
        src="/giving.jpeg"
        alt="Cat on bottom left"
        style={{
          position: "absolute",
          left: 60,
          bottom: 0,
          width: "40rem",
          height: "auto",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* 
      <img
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
      /> 
      */}
    </div>
  );
};

export default SecondPage;
