const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// middleware to parse JSON and encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes'));
app.use(require('./routes/swagger'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  }
});
