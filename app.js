require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT ?? 3000;
const albumsRouter = require('./routes/albumsRouter');
const userRouter = require('./routes/userRouter');
const addPhotosRouter = require('./routes/addPhotosRouter');
const middlewares = require('./middleware/check');

const app = express();
hbs.registerPartials(path.join(process.env.PWD, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'views'));

app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(cookieParser());
app.use(session({
  secret: 'session',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'photo',
  store: new FileStore(),
}));



app.use(middlewares.addToLocals);
app.use('/', userRouter);
app.use('/albums', albumsRouter);
app.use('/photos', addPhotosRouter);

app.listen(PORT, () => {
  console.log('Server started', PORT);
});