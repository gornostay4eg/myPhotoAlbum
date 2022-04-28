const router = require('express').Router();
const { Photo } = require('../db/models');
const { checkAuth } = require('../middleware/check');

router
  .route('/')
  .get(async (req, res) => {
    const allPhoto = await Photo.findAll({ order: [['createdAt', 'DESC']], raw: true });
    res.render('addPhoto', { allPhoto });
  })
  .post(async (req, res) => {
    try {
      const newPhoto = await Photo.create({ ...req.body, user_id: req.session.user.id });
      res.json({ newPhoto });
    } catch (error) {
      console.log('Errrooorr', error);
      res.sendStatus(500);
    }
  });

module.exports = router;
