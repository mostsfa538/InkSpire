const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const adminRoute = require('./src/routes/adminRoutes.js');
const loginRoute = require('./src/routes/loginRoutes.js');
const signupRoute = require('./src/routes/signupRoutes.js');
const cartRoutes = require("./src/routes/cartRoutes.js");
const orderRoutes = require("./src/routes/orderRoutes.js");
const noAuth = require('./src/routes/noAuthRoutes.js');
const session = require('./src/middlewares/session.js');
const userRoute = require('./src/routes/userRoutes.js');
const passport = require("./src/config/googleAuth.js");
const googleAuthRoutes = require("./src/routes/googleAuthRoutes.js")

const scheduleOrderStateChange = require("./src/cronJobs/checkOrderPendingState.js")
const app = express();

dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session)
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);

app.use('/', loginRoute);
app.use('/', signupRoute);
app.use('/', noAuth);

app.use('/api/user', cartRoutes);
app.use('/api/user', orderRoutes);
app.use('/', googleAuthRoutes)

// scheduleOrderStateChange()

app.listen(3000);
