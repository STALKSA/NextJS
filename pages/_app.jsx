import Header from "../components/Header";
import Footer from "../components/footer";
import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
     <main><Component {...pageProps} /></main> 
      <Footer />
    </>
  );
}
