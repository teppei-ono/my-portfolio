import Hero from "./_components/Hero";
import About from "./_components/About";
import Works from "./_components/Works";
import ContentsWrapper from "@/components/context/contentsWrapper/ContentsWrapper";

export default function Home() {
  return (
    <ContentsWrapper>
      <Hero />
      <About />
      <Works />
    </ContentsWrapper>
  );
}
