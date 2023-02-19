import Head from 'next/head';
import armoire from "./armoire";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Abso'Ludique</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
        {armoire()}
    </div>
  );
}

