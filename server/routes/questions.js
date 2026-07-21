const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    const response = await fetch(
        'https://the-trivia-api.com/v2/questions'
    );

    const questions = await response.json();
    res.json(questions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Could not fetch questions' });
  }
});
module.exports = router;