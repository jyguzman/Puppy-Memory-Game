const express = require("express");
const axios = require("axios");
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const { Client } = require("pg");
const path = require('path');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 

const createTable = () => {
  client.connect();
  const query = "CREATE TABLE IF NOT EXISTS puppies ( images varchar(256) )";
  client.query(query, (err, res) => {
    if (err) console.log(err);

    client.end();
  });
}

const insertImages = (images) => {
  client.connect();
  let query = "INSERT INTO puppies (images) VALUES ";
  for(let i = 0; i < images.length; i++) {
    if (i < images.length - 1)
      query += "( '" + images[i].src.original + "'),";
    else query += "('" + images[i].src.original + "');";
  }
  client.query(query, (err, res) => {
    if (err) console.log(err);
    client.end();
  }); 
}

const getImages = () => {
  client.connect();
  client.query("SELECT images FROM puppies", (err, res) => {
    if (err) console.log(err);
    console.log(res.rows[0].images);
    client.end();
  });
}

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

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});