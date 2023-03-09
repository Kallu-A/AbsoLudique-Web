import {fetcher} from "../../api";

export default async function games(req, res) {
    const query = req.query;

    let cursor = await query['cursor']
    let limit = await query['limit']
    let players = await query['players']
    let difficulty = await query['difficulty']
    let duration = await query['duration']
    let category = await query['category']
    //let token = req.cookies['jwt']

    const responses_back = await fetcher("games?cursor="
        + ((cursor !== 'undefined') ? cursor: '1')
        + ((limit !== 'undefined') ? ("&limit=" + limit): '')
        + ((players !== 'undefined') ? ("&players=" + players): '')
        + ((difficulty !== 'undefined') ? ("&difficulty=" + difficulty): '')
        + ((duration !== 'undefined') ? ("&duration=" + duration): '')
        + ((category !== 'undefined') ? ("&category=" + category): '')
        )

    res.status(200);
    res.json(responses_back)
    res.end()
}