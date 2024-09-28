const usernameMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    
    if (!req.user.username) {
      return res.status(403).json({ error: 'Usuario sin nombre de usuario' });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = usernameMiddleware;
