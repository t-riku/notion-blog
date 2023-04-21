import Head from "next/head";
import { Inter } from "@next/font/google";
import { getAllPosts } from "../lib/notionAPI";
import SinglePost from "../components/Post/SinglePost";

export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },

    // 60秒ごとに新しいものに更新していく
    revalidate: 60,
  };
};

export default function Home({ allPosts }) {
  console.log(allPosts);
  return (
    <>
      <Head>
        <title>Notion-Blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container w-full h-full mx-auto mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog 🚀
        </h1>
        {allPosts.map((post) => {
          return (
            <div className="mx-4" key={post.id}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
              />
            </div>
          );
        })}
      </main>
    </>
  );
}
