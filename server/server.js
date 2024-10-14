const express = require('express');
const adminRoute = require('./src/routes/adminBookRoutes.js');
const loginRoute = require('./src/routes/loginRoutes.js');
const signupRoute = require('./src/routes/signupRoutes.js')
const cartRoutes = require("./src/routes/cartRoutes.js")
const session = require('./src/middlewares/session.js');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoute = require('./src/routes/userRoutes.js');
const app = express();

dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session)
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);

app.use('/', loginRoute);
app.use('/', signupRoute)

app.use('/', cartRoutes)

app.listen(3000);
