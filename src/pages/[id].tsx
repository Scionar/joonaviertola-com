import Layout from "@/components/Layout";
import { getAllPostIds, getPostData } from "@/lib/posts";

export default function Post({ postData }: any) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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
  const postData = getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
