const express = require('express')
const cookies = require("cookies")
const middleware = require('./middleware')

const rootRoutes = require('./routes/root-routes')
const dashboardRoutes = require('./routes/dashboard-routes')
const authRoutes = require('./routes/auth-routes')
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(cookies.express('a', 'b', 'c'));

app.use(express.static(`${__dirname}/assets`))
app.locals.basedir = `${__dirname}/assets`;

app.use('/',
  middleware.updateUser, rootRoutes,
authRoutes, 
middleware.validateUser , middleware.updateGuilds, dashboardRoutes);

app.get('*', (req, res) => res.render('errors/404'));

const port = 3000;
app.listen(`${port}`, () => console.log(`Server is ready on port ${port}, http://localhost:${port}`));