import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/posts";

export default function Post({ postData }: any) {
  return (
    <Layout>
      <time className="post-time" dateTime="{{ date | htmlDateString }}">
        {postData.humanDate}
      </time>

      <h1>{postData.title}</h1>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
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
