import '../styles/main.css';
import Layout from "../components/layout";
import React from "react";


export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
