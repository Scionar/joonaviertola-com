import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

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

// export function generateMetadata({ params }: Params): Metadata {
//   const post = await getPostBySlug(params.slug);

//   if (!post) {
//     return notFound();
//   }

//   const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`;

//   return {
//     openGraph: {
//       title,
//       images: [post.ogImage.url],
//     },
//   };
// }

export async function generateStaticParams() {
  const posts = getAllSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
