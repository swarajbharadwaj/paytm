const express = require('express');
const router = require('../routes/index');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
  origin: ["https://pay-sphere-your-digital-vault.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));



app.use("/api/v1", router);
module.exports = (req, res) => {
  app(req, res);
};

app.listen(3000);
