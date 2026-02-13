"use client";
import FirstPage from "./components/section/firstpage/firstpage";
import SecondPage from "./components/section/secondpage/Secondpage";
import ThirdPage from "./components/section/thirdpage/ThirdPage";
import FourthPage from "./components/section/fourthpage/FourthPage";
import SixthPage from "@/sixthpage/page";
import FifthPage from "./components/section/fifthpage/FifthPage";
import MusicPlayer from "./components/MusicPlayer";
import SeventhPage from "./components/section/seventhpage/SeventhPage";
import EightPage from "./components/section/eightpage/EightPage";
import NinePage from "./components/section/ninepage/NinePage";
import TenPage from "./components/section/tenpage/TenPage";

export default function HomePage() {
  return (
    <>
      {/* Add favicon for us.JPG */}
      <head>
        <link rel="icon" type="hearts.jpg" href="/hearts.jpg" />
      </head>
      <div style={{ color: "pink" }}>
        <MusicPlayer />
        <FirstPage />
        <SecondPage />
        <FourthPage />

        <FifthPage />

        <NinePage />

        <SixthPage />
        <TenPage />
        <SeventhPage />

        <ThirdPage />
        <EightPage />
        {/* <FourthPage /> */}
      </div>
    </>
  );
}
