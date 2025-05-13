import express from "express";
import Ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Go to /vid");
});

app.post("/vid", (req, res) => {

    const vidIn_path = req.body.vidIn_path;
    const vidOut_path = req.body.vidOut_path;

    if(!vidIn_path || !vidOut_path) {
        res.status(400).send("Error: provide video input path and output path!");
    } else {
        Ffmpeg(vidIn_path)
        .outputOptions("-vf","scale=-1:144")
        .on("end", () => {
            res.status(200).send("Video processed successfully");
        })
        .on("error", (e) => {
            res.status(500).send(`Internal server error: ${e}`);
            console.log(`Internal server err: ${e}`);
        })
        .save(vidOut_path); //Does not create directories, if input has non existent dirs.
    }

});

const port = process.env.PORT || 8431;

app.listen(port, () => {
    console.log("Listening...")
});