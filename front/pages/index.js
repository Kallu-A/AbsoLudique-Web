import cabinet from "../components/cabinet";
import {getToken} from "../lib/auth";

export default function Home({token}) {
    return (
        <div>
            {cabinet(token)}
        </div>
    );
}

// get the token
export async function getServerSideProps(context) {
    let token = getToken(context)

    return {
        props: {
            token,
        },
    };
}