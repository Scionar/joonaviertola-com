import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import Head from "next/head";

type LayoutProps = {
  children: any;
};

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuClickHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="favicon.svg" color="#000000" />
      </Head>

      <div className="header">
        <div className="header__content">
          <Link href="/" aria-label="Home" className="wrapper">
            <div className="title">
              <span className="title__name">Joona Viertola</span>
              <span className="title__subtitle">Notebook</span>
            </div>
          </Link>

          <nav className="main-navigation" aria-label="Main">
            <button
              className={clsx({
                ["navigation-toggle"]: true,
                ["is-open"]: isMenuOpen,
              })}
              onClick={onMenuClickHandler}
            >
              Menu
              <svg
                fill="currentColor"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </button>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="page-margins">
        <main className="page">
          <article>{children}</article>
        </main>

        <footer>
          Joona Viertola &copy; {new Date().getFullYear()}
          <ul className="social-media">
            <li>
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/joonaviertola"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 32 32">
                  <path d="M19 6h5V0h-5c-3.86 0-7 3.14-7 7v3H8v6h4v16h6V16h5l1-6h-6V7c0-.542.458-1 1-1z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a
                aria-label="Twitter"
                href="https://twitter.com/scionar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg fill="currentColor" viewBox="0 0 32 32">
                  <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path>
                </svg>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
