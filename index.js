const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// GET route
app.get('/api/items', async (req, res) => {
  try {
    const response = await axios.get('http://www.api.technicaltest.quadtheoryltd.com/api/Item?page=1&pageSize=10');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST route
app.post('/api/items', (req, res) => {
  const newItem = req.body;

  // Read the existing data from data.json
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    // Parse the JSON data and add the new item
    const items = JSON.parse(data);
    items.push(newItem);

    // Write the updated data back to data.json
    fs.writeFile('./data.json', JSON.stringify(items, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.json(newItem);
    });
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));