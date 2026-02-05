export const metadata = {
  title: "Valentine Baby",
  description: "Here for a cause",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased relative"
        style={{
          minHeight: "100vh",
          backgroundColor: "pink",
          margin: 0,
          padding: 0,
          minWidth: "100vw",
          overflowX: "hidden",
          // overflowY: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
