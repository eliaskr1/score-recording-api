const express = require('express');

const app = express();
app.use(express.json());

require('./openapi-validator')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Score recorder API listening on port ${PORT}`);
});
