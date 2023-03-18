import '../styles/main.css';
import Layout from "../components/layout";
import React, {useState} from "react";
import {ContextProvider} from "../context";

export default function MyApp({
  Component, pageProps: { session, ...pageProps }
}) {
    return (
        <ContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextProvider>
    );
}