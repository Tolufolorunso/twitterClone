const express = require('express');
const path = require('path');
const sass = require('sass');

const { requireLogin } = require('./middleware');
const authRouter = require('./routes/auth/auth.route');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRouter);

const PORT = 3003;

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

app.get('/', requireLogin, (req, res, next) => {
  const payload = {
    pageTitle: 'Welcome Home',
  };
  res.status(200).render('home', payload);
});
