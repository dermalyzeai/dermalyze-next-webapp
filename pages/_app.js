import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from 'next/script';
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
        .then(() => loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'))
 
        .catch((error) => {
          console.error('Error loading scripts:', error);
        });
    }
    
    if (typeof document !== undefined) {
      require('bootstrap/dist/js/bootstrap');
    }
  }, [router.events]);
  
  return (
    <>
    <Script>
      <script type="module" src="your-script.js">
        console.log("kk");
      </script>
      <link rel="icon" href="https://github.com/4301e00e-966d-44c8-b913-d06cf7b553b1" type="image/x-icon"/>
      <link href='https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/19.2.4/autocomplete-lhc.min.css' rel="stylesheet"/>
    </Script>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </>
    );
}
export default MyApp;
