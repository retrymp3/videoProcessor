"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Go to /vid");
});
app.post("/vid", (req, res) => {
    const vidIn_path = req.body.vidIn_path;
    const vidOut_path = req.body.vidOut_path;
    if (!vidIn_path || !vidOut_path) {
        res.status(400).send("Error: provide video input path and output path!");
    }
    else {
        (0, fluent_ffmpeg_1.default)(vidIn_path)
            .outputOptions("-vf", "scale=-1:144")
            .on("end", () => {
            res.status(200).send("Video processed successfully");
        })
            .on("error", (e) => {
            res.status(500).send(`Internal server error: ${e}`);
            console.log(`Internal server err: ${e}`);
        })
            .save(vidOut_path);
    }
});
const port = process.env.PORT || 8431;
app.listen(port, () => {
    console.log("Listening on http://localhost:1337/");
});
