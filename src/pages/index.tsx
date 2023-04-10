import Head from "next/head";
import Layout from "@/components/Layout";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

type HomePropsType = {
  allPostsData: {
    id: string;
    date: string;
    humanDate: string;
    title: string;
    description: string;
  }[];
};

export default function Home({ allPostsData }: HomePropsType) {
  return (
    <>
      <Head>
        <title>Joona Viertola</title>
        <meta
          name="description"
          content="Excellent home page of IT consultant working with web development"
        />
      </Head>
      <Layout>
        <header className="introduction-block">
          <h1 className="introduction-block__name">Joona Viertola</h1>
          <div aria-hidden="true" className="introduction-block__photo"></div>
          <span className="introduction-block__content">
            <p>
              I live in Helsinki, Finland. I’m a problem solver at heart. I’m
              striving to carve my own path in career and life. Read more about
              me on <Link href="/about">About page</Link>.
            </p>
          </span>
        </header>

        <ul className="post-list">
          {allPostsData.map(({ id, date, title, description, humanDate }) => (
            <li key={id} className="post-list__item">
              <a className="wrapper" href={`/${id}`}>
                <span className="post-list__item-title">{title}</span>
                <span className="post-list__item-description">
                  {description}
                </span>
                <time className="post-list__item-date" dateTime={date}>
                  {humanDate}
                </time>
              </a>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
