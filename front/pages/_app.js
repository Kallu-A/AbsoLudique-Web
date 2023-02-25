import '../styles/main.css';
import Layout from "../components/layout";
import {setupValueToDifficulty, valueToDifficulty} from "../convert/value_to_difficulty";
import {setup_valueToCategory, valueToCategory} from "../convert/value_to_category";

function MyApp({ Component, pageProps }) {
        setupValueToDifficulty(valueToDifficulty)
        setup_valueToCategory(valueToCategory)

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;