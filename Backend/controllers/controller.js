import fs from "fs";
import path from "path";
export default class Controller {
    constructor(app) {
        this.app = app;
    }

    // This method initializes the routes
    initializeRoutes() {
        this.app.get("/streamlit/v1", (req, res) => {
            res.send("Hello World!");
        });
    }

    static async getVideo(req, res) {
        const filePath = path.join(__dirname, 'D','CEH','Videos',req.params.moduleno, req.params.filename)
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.error(err);
                res.status(404).send("Not Found");
                return;
            }
            const range = req.headers.range;
            if (!range) {
                res.status(400).send("Requires Range header");
                return;
            }
            const videoSize = stats.size;
            const CHUNK_SIZE = 10 ** 6;
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };
            res.writeHead(206, headers);
            const videoStream = fs.createReadStream(filePath, { start, end });
            videoStream.pipe(res);
        });
}
}