import express from "express";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import path from "path";
config();

const __dirname = path.resolve();
const app = express();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/view/home.html");
});
app.get("/get-data", async function (req, res) {
  const input = req.query.input;
  try {
    // res.send({ test: "data" });
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });
    console.log(completion.data.choices[0].message.content);
    res.send({ data: completion.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.send(error.response);
    } else {
      console.log(error.message);
      res.send(error.message);
    }
  }
});

var port = process.env.PORT || 3001;
app.listen(port);
console.log("Express app started on port " + port);
