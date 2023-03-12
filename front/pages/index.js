import cabinet from "../components/cabinet";
import {getToken} from "../lib/auth";

export default function Home({token}) {
    console.log("Home token " + token)
    return (
        <div>
            {cabinet(token)}
        </div>
    );
}

export async function getServerSideProps(context) {
    let token = getToken(context)

    return {
        props: {
            token,
        },
    };
}