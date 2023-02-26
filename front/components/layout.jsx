import Navbar from "./navbar";
import Head from "next/head";
export default function Layout({ children }) {
  return (
    <>
        <Head>
            <title>Abso'Ludique</title>
            <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        {children}
    </>
  );
}