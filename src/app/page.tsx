import Image from "next/image";
import profilePic from "@/assets/me.png";
import Link from "next/link";
import { getAllFrontpagePosts } from "@/lib/posts";

export default function Index() {
  const allPosts = getAllFrontpagePosts();

  return (
    <main>
      <header className="introduction-block">
        <Image
          className="introduction-block__photo"
          src={profilePic}
          alt="Picture of the author"
          width={170}
          height={170}
        />
        <span className="introduction-block__content">
          <p>
            I live in Helsinki, Finland. I’m a problem solver at heart. I’m
            striving to carve my own path in career and life. Read more about me
            on <Link href="/about">About page</Link>.
          </p>
        </span>
      </header>

      <ul className="post-list">
        {allPosts.map(({ slug, date, title, description, humanDate }) => (
          <li key={slug} className="post-list__item">
            <a className="wrapper" href={`/${slug}`}>
              <span className="post-list__item-title">{title}</span>
              <span className="post-list__item-description">{description}</span>
              <time className="post-list__item-date" dateTime={date}>
                {humanDate}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
