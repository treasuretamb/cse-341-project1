const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Use the contacts routes instead of users routes
router.use('/contacts', require('./contacts'));

module.exports = router;
