const express = require('express');
const homeRoute = require('./src/routes/home.js');
const adminRoute = require('./src/routes/adminBookRoutes.js');
const loginRoute = require('./src/routes/loginRoutes.js');
const session = require('./src/middlewares/session.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session)

app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/', loginRoute);

app.listen(3000, () => {
    console.log("listening")
});
