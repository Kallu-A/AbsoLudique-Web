import '../styles/main.css';
import Layout from "../components/layout";
import React, {useState} from "react";

export default function MyApp({
  Component, pageProps: { session, ...pageProps }
}) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}