import '@/styles/globals.css'
// Bootstrap CSS
import Header from "@/components/Header";
import { useEffect } from "react";
export { reportWebVitals } from "next-axiom";


export default function App({ Component, pageProps }) {


  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
