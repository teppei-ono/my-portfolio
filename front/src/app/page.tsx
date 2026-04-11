import Hero from "./_components/Hero";
import About from "./_components/About";
import Works from "./_components/Works";
import Skills from "./_components/Skills";
import Blog from "./_components/Blog";
import Strength from "./_components/Strength";
import ContentsWrapper from "@/components/context/contentsWrapper/ContentsWrapper";

export default function Home() {
  return (
    <ContentsWrapper>
      <Hero />
      <About />
      <Works />
      <Skills />
      <Blog />
      <Strength />
    </ContentsWrapper>
  );
}
