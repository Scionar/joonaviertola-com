import { notFound } from "next/navigation";
import { getAllSlugs, getMetadataBySlug, getPostBySlug } from "@/lib/posts";
import { Metadata } from "next";

export default async function Post({ params }: Params) {
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
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: Params): Metadata {
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
