const { Photo } = require('../db/models');

const addToLocals = (req, res, next) => {
  if (req.session?.user) {
    res.locals.user = req.session.user;
  }
  next();
};

const checkAuth = async (req, res, next) => {
  const { id } = req.params;
  const photo = await Photo.findByPk(id);
  if (Number(req.session.user.id) === photo.user_id) {
    return next();
  }
  return res.sendStatus(401);
};

module.exports = { addToLocals, checkAuth };
