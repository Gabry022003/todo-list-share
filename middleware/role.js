module.exports = function(requiredLevel) {
  return (req, res, next) => {
    if (req.user.accessLevel !== requiredLevel)
      return res.status(403).json({ error: 'Permesso negato' });
    next();
  };
};
