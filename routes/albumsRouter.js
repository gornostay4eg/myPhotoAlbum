const router = require('express').Router();
const { Op } = require('sequelize');
const { Album, Photo } = require('../db/models');

// /albums - страница со своими и чужими альбомами
router.get('/', async (req, res) => {
  try {
    const userAlbums = await Album.findAll({ where: { user_id: req.session.user.id } }); // ?????????
    const allAlbums = await Album.findAll({
      where: { status: true, user_id: { [Op.ne]: req.session.user.id } },
    }); /// ///???
    return res.render('albums', { userAlbums, allAlbums }); // название hbs для отображения всех альбомов
  } catch (error) {
    return res.send('Error');
  }
});

// /albums/addalbum - страница для создания нового альбома
router.get('/addalbum', async (req, res) => res.render('addalbum'));

// /albums/addalbum - сюда отправляются альбомы из формы со страницы добавления альбома
router.post('/addalbum', async (req, res) => {
  try {
    await Album.create({ title: req.body.title, status: req.body.status, user_id: req.session.user.id }); /// /??
    return res.redirect('/albums'); // - после создания нового альбома делаем редирект на страничку со всеми альбомами
  } catch (error) {
    return res.send('Error');
  }
});

// router.delete('/deletealbum', async (req, res) => {

// /albums/:id - страница конкретного альбома
router.get('/:id', async (req, res) => {
  try {
    const photos = await Photo.findAll({ where: { user_id: req.session.user.id, album_id: req.params.id } });
    const thisAlbum = await Album.findOne({ where: { id: req.params.id } });
    return res.render('album', { photos, thisAlbum });
  } catch (error) {
    return res.send('Error');
  }
});

module.exports = router;
