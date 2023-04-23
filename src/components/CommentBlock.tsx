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
      <section className="comment-section">
        <h1>Comments</h1>

        <article className="comment-section__consent-block" id="consentBlock">
          <p>Would you like to see comments?</p>

          <p>
            Comments are hidden by default, since they use 3rd party service{" "}
            <a href="https://disqus.com/">Disqus</a>.
          </p>

          <button
            className="comment-section__show-button"
            id="showCommentsButton"
          >
            Show comments
          </button>
        </article>
        <div id="disqus_thread"></div>
      </section>

      <Script id="disqus" strategy="lazyOnload">
        {`
            var button = document.getElementById('showCommentsButton');
            var consentBlock = document.getElementById('consentBlock');

            button.addEventListener('click', function() {
                triggerDisqus();
                hideConsentBlock();
            }, false);

            function hideConsentBlock() {
                consentBlock.remove();
            }

            function triggerDisqus() {
                var disqus_config = function () {
                    this.page.url = '${canonicalUrl}';
                    this.page.identifier = 'joonaviertola';
                };

                (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://joonaviertola.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
                })();
            }
        `}
      </Script>
    </>
  );
}
