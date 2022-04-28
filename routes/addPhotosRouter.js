const router = require('express').Router();
const { Photo } = require('../db/models');
const { checkAuth } = require('../middleware/check');

// "/photos/"
router
  .route('/')
  .get(async (req, res) => {
    const allPhoto = await Photo.findAll({ where: { user_id: req.session.user.id }, order: [['createdAt', 'DESC']], raw: true });
    res.render('addPhoto', { allPhoto });
  })
  .post(async (req, res) => {
    if (req.body.album_id) {
      try {
        const newPhoto = await Photo.create({ ...req.body, user_id: req.session.user.id });
        res.json({ newPhoto });
      } catch (error) {
        console.log('Errrooorr', error);
        res.sendStatus(500);
      }
    } else {
      // FIX: alert('Выберите альбом для фото'); to frontend
      res.status(401).end();
    }
  });

  //99
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
