const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatbotRoute = require("./routes/chatbot");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/chatbot", chatbotRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
