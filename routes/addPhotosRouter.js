const router = require('express').Router();
const { Photo, Album } = require('../db/models');
const { checkAuth } = require('../middleware/check');

// "/photos/"
router
  .route('/')
  .get(async (req, res) => {
    const allAlbum = await Album.findAll({ where: { user_id: req.session.user.id }, order: [['createdAt', 'DESC']], raw: true });
    res.render('addPhoto', { allAlbum });
  })
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const newPhoto = await Photo.create({ ...req.body, user_id: req.session.user.id });
      res.redirect('/albums');
    } catch (error) {
      console.log('Errrooorr', error);
      res.sendStatus(500);
    }
  });

// "/photos/:id"
router
  .route('/:id')
  .delete(checkAuth, async (req, res) => {
    const { id } = req.params;
    try {
      await Photo.destroy({ where: { id } });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const photo = await Photo.findOne({ where: { id } });
    res.render('editphoto', { photo });
  })
  .put(checkAuth, async (req, res) => {
    const {
      title, img, userId, id,
    } = req.body;
    await Photo.update({ title, src: img, user_id: userId }, { where: { id } });
    res.sendStatus(200);
  });

module.exports = router;
