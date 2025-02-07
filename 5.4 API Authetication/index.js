import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "Ayush";
const yourPassword = "123";
const yourAPIKey = "4d729095-bffb-4b3e-97c6-f80ef01b1b33";
const yourBearerToken = "406493e6-646e-4029-a95b-b9f47ec8c426";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.log(error);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=2",
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/filter",
      {
        params: {
          apiKey: yourAPIKey,
          score: 5,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/42",
      {
        headers: { Authorization: `Bearer ${yourBearerToken}` },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
