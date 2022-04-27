const router = require('express').Router();
const sha256 = require('sha256');
const { User } = require('../db/models');

router
  .route('/registration')
  .get((req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    const {
      name, email, password,
    } = req.body;
    if (!name || !email || !password) {
      return res.render('signup', { message: 'Заполните все поля' });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    }).catch((e) => e);
    if (newUser instanceof Error) {
      return res.render('signup', {
        message: 'Такой пользователь уже существует',
      });
    }
    req.session.user = { id: newUser.id, name: newUser.name };
    return res.redirect('/');
  });

router
  .route('/autorization')
  .get((req, res) => {
    res.render('signin');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render('signin', { message: 'Заполните все поля' });
    }
    const currentUser = await User.findOne({ where: { email }, raw: true });
    if (currentUser instanceof Error) {
      return res.render('404');
    }
    if (!currentUser) {
      return res.render('signup', {
        message: 'Пользователь не найден',
      });
    }
    if (sha256(password) !== currentUser.password) {
      return res.render('signin', { message: 'Пароль неверный' });
    }
    if (currentUser.password === sha256(password)) {
      req.session.user = { id: currentUser.id, name: currentUser.name };
      return res.redirect('/');
    }
  });

router.route('/exit').get((req, res) => {
  req.session.destroy();
  res.clearCookie('music').redirect('/');
});

module.exports = router;
