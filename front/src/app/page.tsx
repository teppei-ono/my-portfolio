import Hero from "./_components/Hero";
import About from "./_components/About";
import Works from "./_components/Works";
import Skills from "./_components/Skills";
import Blog from "./_components/Blog";
import Strength from "./_components/Strength";
import { fetchMicroCMSList } from "@/libs/microcms";
import { Blogs } from "@/types/microcms";

export default async function Home() {
  const { BlogList } = await getData();

  console.log('BlogList', BlogList);

  return (
    <>
      <Hero />
      <About />
      <Works />
      <Skills />
      <Blog BlogList={BlogList.contents} />
      <Strength />
    </>
  );
}

// サーバーサイドでデータを取得
async function getData() {
  try {
    // Topicsリストの取得(公開日の最新6件表示)
    const BlogList = await fetchMicroCMSList<Blogs>('blogs', {
      orders: '-publishedAt', // 公開日降順
    });

    return {
      BlogList,
    };
  } catch (error) {
    console.error('microCMS API エラー:', error);
    return {
      BlogList: { contents: [], totalCount: 0, offset: 0 },
    };
  }
}
