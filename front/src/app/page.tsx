import Hero from "./_components/Hero";
import About from "./_components/About";
import ContentsWrapper from "@/components/context/contentsWrapper/ContentsWrapper";

export default function Home() {
  return (
    <ContentsWrapper>
      <Hero />
      <About />
    </ContentsWrapper>
  );
}
