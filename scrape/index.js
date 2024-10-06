const express = require('express');
const cron = require('node-cron');
const scrapeUpcomingEvents = require('./scraper-functions/scrapeUpcomingEvents');
const scrapeFaculties = require('./scraper-functions/scrapeFaculties');
require('dotenv').config();

// Set the timezone to Indian Standard Time (IST)
process.env.TZ = 'Asia/Kolkata';

// Create an Express application
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is active and running!');
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Schedule the task to run daily at 12:00 AM IST
cron.schedule('0 0 * * *', () => {
  console.log('Running scrapeUpcomingEvents...');
  scrapeUpcomingEvents();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});

// Schedule the task to run on the 1st of August at 12:00 AM IST
cron.schedule('0 0 1 8 *', () => {
  console.log('Running scrapeFaculties...');
  scrapeFaculties();
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});