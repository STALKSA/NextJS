import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
