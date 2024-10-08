#!/usr/bin/node
// const crypto = require('crypto');
const bcrypt = require("bcrypt")
// const secret = crypto.randomBytes(32).toString('hex');
// console.log(secret);
bcrypt.hash("okokokok", 10).then(res=>{console.log(res)});
// console.log(__dirname + "/src");
