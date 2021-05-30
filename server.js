const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
require('dotenv').config()

const app = express();

const url = "https://api.pexels.com/v1/search?query=puppy&per_page=80";
const key = process.env.PEXELS_API_KEY;

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

const shuffle = array => {
  for(let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i+1));
      swap(array, j, i)
  }
};

app.get("/images", (req, res) => {
  axios.get(url, {
    headers: {
      Authorization: key
    },
  }).then(response => {
    const photos = response.data.photos;
    let cards = [];
    for(let i = 0; i < photos.length; i++) {
      const card = {
        img: photos[i].src.original,
      };

      const match = {
        img: photos[i].src.original,
      };

      cards.push(card);
      cards.push(match);
    }
    shuffle(cards);
    res.json( {"images" : cards} );
  }).catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});