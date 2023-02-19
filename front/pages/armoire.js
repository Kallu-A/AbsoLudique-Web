import {fetcher} from "../api";
import Game from "../components/game";
import useSWRInfinite from "swr/infinite";

let PAGE_SIZE = 4

export default function armoire() {

    const {
        data,
        mutate,
        size,
        setSize,
        isValidating,
        isLoading
    } = useSWRInfinite(
        (index) => 'games?cursor=' + ( (index * PAGE_SIZE) + 1) + '&limit=' + PAGE_SIZE
        ,
        fetcher
    );

    const games = data ? [].concat(...data) : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

    return (
        <>
            <div className='flex flex-wrap margin flex-games'>
                { games && games.map( (game) => {
                    return (
                        <Game key={game.idBoardgame} game={game}/>
                    )
                })}
            </div>
            { games && !isReachingEnd && <>
                    <button
                        disabled={isLoadingMore || isReachingEnd}
                        onClick={() => setSize(size + 1)}
                    >
                        {isLoadingMore
                            ? "chargement..."
                            : "voir plus"}
                    </button>
            </>
            }

        </>
    )
}