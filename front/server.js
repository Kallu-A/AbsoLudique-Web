const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const port = process.env.NODE_ENV === "production" ? 8080 : 3000;
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost" // to change when prod
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("./cert/abso.key"),
    cert: fs.readFileSync("./cert/abso.pem")
};

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
    });
});
