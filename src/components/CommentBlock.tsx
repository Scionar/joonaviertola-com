import Script from "next/script";
import { useRouter } from "next/router";

type CommentBlockProps = {};

export default function CommentBlock({}: CommentBlockProps) {
  const siteUrl = "https://joonaviertola.com";
  const router = useRouter();
  const cleanPath = router.asPath.split("#")[0].split("?")[0];
  const canonicalUrl = `${siteUrl}` + (router.asPath === "/" ? "" : cleanPath);

  return (
    <>
      <section className="comment-section" id="disqus_thread"></section>

      <Script id="disqus" strategy="lazyOnload">
        {`
            /*
            var disqus_config = function () {
            this.page.url = ${canonicalUrl};
            this.page.identifier = 'joonaviertola';
            };
            */

            (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://joonaviertola.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
            })();
          `}
      </Script>
    </>
  );
}
