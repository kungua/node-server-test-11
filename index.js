const express = require("express");
const multer = require("multer");
const cors = require("cors");

const upload = multer({ dest: "static" });

const app = express();

app.get("/", (req, res) => {
  res.send("hello node");
});

app.options("/upload", cors());
app.post("/upload", cors(), upload.single("file"), (req, res) => {
  res.send(req.file.filename);
});

app.get("/preview/:key", cors(), (req, res) => {
  const filename = req.params.key;
  res.sendFile(
    `static/${filename}`,
    {
      root: __dirname,
      headers: {
        "Content-Type": "image/jpeg"
      }
    },
    error => {
      if (error) {
        res.status(404).send("file not found");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("请原地后空翻两圈然后使用电饭煲打开 http://localhost:3000");
});
