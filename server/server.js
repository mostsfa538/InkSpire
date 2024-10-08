const express = require('express');
const homeRoute = require('./src/routes/home.js');
const adminRoute = require('./src/routes/adminBookRoutes.js');
const loginRoute = require('./src/routes/loginRoutes.js');
const signupRoute = require('./src/routes/signupRoutes.js')
const session = require('./src/middlewares/session.js');

const userRoute = require('./src/routes/userRoutes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session)
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);

app.use('/', homeRoute);
app.use('/admin', adminRoute);
app.use('/', loginRoute);
app.use('/', signupRoute)

app.listen(3000, () => {
    console.log("listening")
});
