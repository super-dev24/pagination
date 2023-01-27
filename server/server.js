const express = require("express");
const cors = require("cors");
const app = express();
let mockData = require("./mock.json");

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/products/", (req, res) => {
  const { offset, limit } = req.query;
  const products = mockData.slice(+offset * +limit, +offset * +limit + +limit);
  return res.json({ totalCount: mockData.length, products });
});

app.delete("/products/", (req, res) => {
  const { id, offset, limit } = req.query;
  mockData = mockData.filter((item) => item.id !== +id);
  const products = mockData.slice(+offset * +limit, +offset * +limit + +limit);
  return res.json({ totalCount: mockData.length, products });
});

app.post("/products/", (req, res) => {
  const { id, name, offset, limit } = req.query;
  mockData = mockData.map((item) =>
    item.id === +id ? { ...item, name: name } : { ...item }
  );
  const products = mockData.slice(+offset * +limit, +offset * +limit + +limit);
  return res.json({ totalCount: mockData.length, products });
});

app.listen(4000, () => {
  console.log("Listen on the port 4000");
});
