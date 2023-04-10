import Head from "next/head";
import Layout from "@/components/Layout";
import { getSinglePageData } from "@/lib/posts";

export default function About({ postData }: any) {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Description about me" />
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
