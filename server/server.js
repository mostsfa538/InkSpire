const express = require('express');
const adminRoute = require('./src/routes/adminRoutes.js');
const loginRoute = require('./src/routes/loginRoutes.js');
const signupRoute = require('./src/routes/signupRoutes.js')
const cartRoutes = require("./src/routes/cartRoutes.js")
const orderRoutes = require("./src/routes/orderRoutes.js")
const noAuth = require('./src/routes/noAuthRoutes.js');

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
app.use('/', signupRoute);
app.use('/', noAuth);

app.use('/api/user', cartRoutes);
app.use('/api/user', orderRoutes);

app.listen(3000);
