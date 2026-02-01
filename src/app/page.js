import FirstPage from "./components/section/firstpage/firstpage";
import SecondPage from "./components/section/secondpage/Secondpage";
import ThirdPage from "./components/section/thirdpage/ThirdPage";
import FourthPage from "./components/section/fourthpage/FourthPage";
export default function HomePage() {
  return (
    <div style={{ color: "pink" }}>
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <FourthPage />
    </div>
  );
}
