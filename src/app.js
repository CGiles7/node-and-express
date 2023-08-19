const express = require('express');
const app = express();
const validateZip = require('./middleware/validateZip');
const getZoos = require('./utils/getZoos');

// Routes
app.get('/check/:zip', validateZip, async (req, res) => {
  const zip = req.params.zip;
  const zoos = await getZoos(zip);

  if (zoos && zoos.length > 0) {
    res.send(`${zip} exists in our records.`);
  } else {
    res.send(`${zip} does not exist in our records.`);
  }
});

app.get('/zoos/all', (req, res) => {
  const isAdmin = req.query.admin === 'true';
  if (isAdmin) {
    const allZoos = getZoos();
    const allZoosString = allZoos.join('; ');
    res.send(`All zoos: ${allZoosString}`);
  } else {
    res.status(403).send('You do not have access to that route.');
  }
});

app.get('/zoos/:zip', validateZip, (req, res) => {
  const zip = req.params.zip;
  const zoos = getZoos(zip); 
  if (zoos.length > 0) {
    const zoosString = zoos.join('; ');
    res.send(`${zip} zoos: ${zoosString}`);
  } else {
    res.send(`${zip} has no zoos.`);
  }
});

// Error handling
app.use((req, res) => {
    res.status(404).send('That route could not be found!');
});

module.exports = app;
