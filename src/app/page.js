import FirstPage from "./components/section/firstpage/firstpage";
import SecondPage from "./components/section/secondpage/Secondpage";
import ThirdPage from "./components/section/thirdpage/ThirdPage";
import FourthPage from "./components/section/fourthpage/FourthPage";
import FifthPage from "./components/section/fifthpage/FifthPage";
export default function HomePage() {
  return (
    <div style={{ color: "pink" }}>
      <FirstPage />
      <SecondPage />
      <FifthPage />

      <ThirdPage />
      <FourthPage />
    </div>
  );
}
