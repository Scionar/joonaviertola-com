import Layout from "@/components/Layout";
import CommentBlock from "@/components/CommentBlock";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Head from "next/head";
import Script from "next/script";

export default function Post({ postData }: any) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.description} />
      </Head>
      <Layout>
        <time className="post-time" dateTime={postData.date}>
          {postData.humanDate}
        </time>

        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />

        <CommentBlock />
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type getStaticPropsType = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: getStaticPropsType) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
