import Head from 'next/head';
import cabinet from "../components/cabinet";

export default function Home() {
    return (
    <div>
        {cabinet()}
    </div>
    );
}

