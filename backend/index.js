const express = require('express');
const router = require('./routes/index');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: "https://pay-sphere-your-digital-vault.vercel.app",
    credentials: true,
  })
);
     
app.use("/api/v1", router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
