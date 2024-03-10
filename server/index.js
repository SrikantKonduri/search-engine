const express = require("express");
const app = express();
const fs = require("fs");
// const solr = require("solr-client");
const solrNode = require("solr-node");
// const client = solr.createClient();
const NODE_PORT = 8080;
const client = new solrNode({
  host: "localhost",
  port: "8983",
  core: "sample",
  protocol: "http",
});

const search = async () => {
  let query = client.query().q({}).addParams({
    wt: "json",
    indent: true,
  });
  let data = await client.search(query);
  return data;
};

const readJSONFile = (filepath) => {
  const fs = require("fs");
  const jsonData = fs.readFileSync(filepath, "utf8");
  const jsonObject = JSON.parse(jsonData);
  return jsonObject;
};

app.get("/search", async (req, res) => {
  const keyword = req.query.keyword.toLowerCase();
  const fuzzyKeyWord = `${keyword}~`;
  console.log(keyword);
  let data;
  try {
    const query = client
      .query()
      // .q(`title: *${keyword}* OR description: *${keyword}*`);
      .q(`title: ${fuzzyKeyWord} OR description: ${fuzzyKeyWord}`);
    data = await client.search(query);
    let res_data = [];
    data.response.docs.forEach((item) => {
      res_data.push({
        title: item.title[0],
        description: item.description[0],
        id: item.id,
      });
    });
    // console.log(data.response.docs);
    res.status(200).json({ data: res_data });
  } catch (e) {
    res.status(400).json({ status: "Cannot search" });
  }
});

app.get("/load", async (req, res) => {
  console.log("Loading data");
  const filepath = "./data.json";
  const data_obj = readJSONFile(filepath);
  try {
    data_obj.data.forEach(async (item) => {
      const res_obj = await client.update(item);
    });
    res.status(200).json(data_obj);
  } catch (e) {
    console.log("sad", e);
    res.status(200).json({ status: "Some error" });
  }
});

app.listen(NODE_PORT, () => {
  console.log(`Server Listenning at port ${NODE_PORT}`);
});
