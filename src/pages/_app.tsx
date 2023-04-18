import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${firaSans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
