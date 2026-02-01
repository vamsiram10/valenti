import React from "react";

const ThirdPage = () => {
  return (
    <div
      style={{
        color: "black",
        backgroundColor: "white",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src="/letter.png"
          alt="Paper"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            right: 450,
          }}
        />
      </div>
    </div>
  );
};

export default ThirdPage;
