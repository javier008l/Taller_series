require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();

app.listen(port, () => console.log('Active port', port));

const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handlers')

mongoose
  .connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Sucess connect with mongo'))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);
