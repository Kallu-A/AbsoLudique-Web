import Head from 'next/head';
import cabinet from "../components/cabinet";

export default function Home() {
    return (
    <div>
      <Head>
        <title>Abso'Ludique</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
        {cabinet()}
    </div>
    );
}

