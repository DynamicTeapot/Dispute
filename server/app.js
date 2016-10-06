const express = require('express');
const router = require('./router');
const bp = require('body-parser');
const morgan = require('morgan');

const app = express();
//Server accepts json stringified things.
app.use(bp.json())
app.use(morgan('dev'));

app.use('/', router);

app.listen(4006);