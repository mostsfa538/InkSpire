const express = require('express');
const adminRoute = require('./src/routes/adminBookRoutes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRoute);

app.listen(3000);