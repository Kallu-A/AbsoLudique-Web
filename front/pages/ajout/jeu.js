import add_game from "../../components/add_game";
import {getToken} from "../../lib/auth";

export default function addGame({token}) {
    return (
        <>
            {add_game(token)}
        </>
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