import type { Metadata } from "next";
import { Jost, Noto_Sans_JP } from "next/font/google";
import "destyle.css";
import "@/styles/globals.scss";
import Header from "@/components/context/header/Header";
import Footer from "@/components/context/footer/Footer";
import InViewInit from "@/components/context/Inview/InView";
import { HEADER_LOWER_NAV_LIST } from "@/constants/header";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "大野哲平のポートフォリオ",
  description: "大野哲平のポートフォリオサイトです。webのフロントエンドエンジニアで、キャッチアップした技術をブログでアウトプットしています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${jost.variable}antialiased`}
    >
      <body>
        <InViewInit />
        <Header navList={HEADER_LOWER_NAV_LIST} />
          {children}
        <Footer />
      </body>
    </html>
  );
}
