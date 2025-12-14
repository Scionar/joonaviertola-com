import { notFound } from "next/navigation";
import { getAllSlugs, getMetadataBySlug, getPostBySlug } from "@/lib/posts";
import { Metadata } from "next";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      {post.date && (
        <time className="post-time" dateTime={post.date}>
          {post.humanDate}
        </time>
      )}

      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getMetadataBySlug(params.slug);

  const title = post.title ? post.title : "Joona Viertola";

  return {
    title,
  };
}

export async function generateStaticParams() {
  const posts = getAllSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
