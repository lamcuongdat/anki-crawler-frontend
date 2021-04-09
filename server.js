const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4200

app.use(cors());
// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log(`Anki Crawler is listening on port ${port}`)
});

// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/anki-crawler'));

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname+'/anki-crawler/index.html'));
});
