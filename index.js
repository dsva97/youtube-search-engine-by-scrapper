require("dotenv").config();
const express = require("express");
const app = express();

const searcher = require("./ppt");

const PORT = process.env.PORT || 3033;

const main = async () => {
  const page = await searcher.init();

  app.get("/search/:search", async (req, res) => {
    const data = await searcher.search(page, req.params.search);
    res.json(JSON.parse(JSON.stringify(data)));
  });

  app.listen(PORT, () => console.log("Running in port " + PORT));
};

main();
