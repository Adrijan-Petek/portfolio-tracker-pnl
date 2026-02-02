import "../styles/globals.css";
import { Sora, IBM_Plex_Sans } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${sora.variable} ${plex.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
