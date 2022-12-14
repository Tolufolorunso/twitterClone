require('dotenv').config();
require('express-async-errors');
const express = require('express');
const path = require('path');
const sass = require('sass');
const morgan = require('morgan');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connectDB = require('./configs/connectDb');

const { requireLogin } = require('./middleware');
const authRouter = require('./routes/auth/auth.routes');
const tweetRouter = require('./routes/tweet/tweet.routes');



const app = express();

// app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'secret',
    resave: false, 
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// passport config
const User = require('./models/User.model')
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let DB;

if (process.env.NODE_ENV === 'development') {
  DB = process.env.MONGO_LOCAL;
  app.use(morgan('dev'));
} else {
  DB = process.env.MONGO_URI;
}

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', requireLogin, (req, res, next) => {
  res.status(200).redirect('/home');
});

app.get('/home', requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: 'Welcome Home',
  };
  res.status(200).render('home/home', payload);
});

app.use('/auth', authRouter);
app.use('/api/tweets', tweetRouter);

const PORT = process.env.PORT || 3003;

const start = async () => {
  try {
    await connectDB(DB);
    const server = app.listen(PORT, () =>
      console.log(`Server listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
