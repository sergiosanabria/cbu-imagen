import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-circular-progressbar/dist/styles.css";

import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CBU.JPG</title>
        <link rel="icon" href="/jpg-icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
