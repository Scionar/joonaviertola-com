import Head from "next/head";
import Layout from "@/components/Layout";
import { getSinglePageData } from "@/lib/posts";

export default function Home({ postData }: any) {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Description about me" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const postData = await getSinglePageData("about");

  return {
    props: {
      postData,
    },
  };
}
