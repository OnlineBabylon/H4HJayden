const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const yelpApiKey = process.env.YELP_API_KEY;

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const yelpRouter = express.Router();

yelpRouter.get('/restaurants', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    const response = await fetch(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=16093&categories=restaurants`, {
      headers: {
        'Authorization': `Bearer ${yelpApiKey}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Yelp API');
    }

    const data = await response.json();

    // Set appropriate content type header and send JSON data
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.use('/yelp-api', yelpRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
