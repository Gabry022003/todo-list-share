const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'Registrazione avvenuta' });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ error: 'Credenziali errate' });

  const token = jwt.sign({
    id: user._id,
    username: user.username,
    accessLevel: user.accessLevel
  }, 'SECRET_KEY', { expiresIn: '1h' });

  res.json({ token, username: user.username, accessLevel: user.accessLevel });
});

module.exports = router;
