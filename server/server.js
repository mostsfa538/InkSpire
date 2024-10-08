const express = require('express');
const adminRoute = require('./src/routes/adminBookRoutes.js');
const userRoute = require('./src/routes/userRoutes.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);

app.listen(3000);
