import React from "react";

const FirstPage = () => {
  return (
    <div
      style={{
        color: "black",
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        backgroundImage: 'url("/first.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="your-text-class"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          // so clicks pass through to underlying elements if needed
        }}
      >
        HAPPY VALENTINE&apos;S DAY
      </div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
          .your-text-class {
            font-family: 'Staatliches', cursive, sans-serif;
            color: #c2185b; /* dark pink */
            font-size: 4rem;
            letter-spacing: 2.22px;
            font-weight: 700;
            text-transform: uppercase;
            text-shadow: 0 2px 4px rgba(34,34,34,0.15);
          }
        `}
      </style>
      <div
        style={{
          position: "absolute",
          right: "30px",
          bottom: "30px",
          textAlign: "right",
          fontFamily: "'Staatliches', cursive, sans-serif",
          fontSize: "1.5rem",
          color: "#c2185b",
          maxWidth: "300px",
          zIndex: 10,
          letterSpacing: "0.05em",
        }}
      >
        <br />
        <span
          style={{
            fontWeight: 600,
            fontSize: "2rem",
            color: "#c2185b",
            fontFamily: "cursive",
          }}
        >
          ~Hellosss
        </span>
      </div>
    </div>
  );
};

export default FirstPage;
