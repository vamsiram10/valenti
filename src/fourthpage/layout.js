"use client";

import { useEffect } from "react";
import Lenis from "lenis";

function FourthLayout({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return; // only run on client

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => t,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <main className="min-h-[100vh] w-screen overflow-x-hidden bg-black">
      {children}
    </main>
  );
}

export default FourthLayout;
