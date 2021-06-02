const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const app = express();

const url = "https://api.pexels.com/v1/search?query=puppy&per_page=80";
const key = process.env.PEXELS_API_KEY;

app.get("/images", (req, res) => {
  axios.get(url, {
    headers: {
      Authorization: key
    },
  }).then(response => {
    const photos = response.data.photos;
    res.json( {"images" : photos} );
  }).catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});