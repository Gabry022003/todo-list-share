const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token mancante' });
  try {
    const user = jwt.verify(token, 'SECRET_KEY');
    req.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Token non valido' });
  }
};
