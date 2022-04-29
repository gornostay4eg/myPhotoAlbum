const router = require('express').Router();
const { Photo, Album } = require('../db/models');
const { checkAuth } = require('../middleware/check');
const multer = require('../middleware/multer.middleware');

// "/photos/"
router
  .route('/')
  .get(async (req, res) => {
    const allAlbum = await Album.findAll({ where: { user_id: req.session.user.id }, order: [['createdAt', 'DESC']], raw: true });
    res.render('addPhoto', { allAlbum });
  })
  .post(multer.single('src'), async (req, res) => {
    try {
      const album = await Album.findOne({ where: { title: req.body.albumName }, raw: true });
      const newPhoto = await Photo.create({
        ...req.body, src: req.file.path.slice(6), album_id: album.id, user_id: req.session.user.id,
      });
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
  });

router
  .route('/put/:id')
  .post(checkAuth, async (req, res) => {
    const idPut = req.params.id;
    const {
      title,
    } = req.body;
    await Photo.update({ title }, { where: { id: idPut } });
    res.redirect(`/photos/${idPut}`);
  });

module.exports = router;
