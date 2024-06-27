import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  
  const router = useRouter();
  useEffect(() => {
    
    // Ensure scripts are only loaded on the client side
    if (typeof window !== 'undefined') {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      // Load scripts in sequence
      loadScript('./scripts/classifications.js')
        .then(() => {var numClasses = skinClassifications.length})
        .then(() => loadScript('./scripts/image-loader.js'))
        .then(() => loadScript('./scripts/jquery.min.js'))
        .then(() => loadScript('./scripts/ndarray-browser.min.js'))
        .then(() => loadScript('https://cdn.jsdelivr.net/npm/onnxjs/dist/onnx.min.js'))
        .then(() => loadScript('./scripts/script.js'))
        .then(() => loadScript('./scripts/NewGpt.js'))
 
        .catch((error) => {
          console.error('Error loading scripts:', error);
        });
    }
    
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, [router.events]);
  
  return (
    <>
    <Head>
      <script>
        console.log("kk");
      </script>
  
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
    );
}
export default MyApp;
