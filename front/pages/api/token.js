export default async function token(req, res) {
    let token = req.cookies['jwt']
    res.json(token)
    res.end()
}