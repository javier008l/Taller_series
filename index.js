require('dotenv').config();
const port =  process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const routerApi = require('./src/routes');
const app = express();

app.listen(port, () => console.log('Active port', port));

/*================TWILIO=============== */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Parley',
     from: '+12393635628',
     to: '+573107719006'
   })
  .then(message => console.log(message.sid));

const { logErrors, errorHandler, boomErrorHandler } = require('./src/handlers/errors.handlers');
const { EmailAddress } = require('@sendgrid/helpers/classes');

mongoose
  .connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log('Sucess connect with mongo'))
  .catch((err) => console.error(err));


/**===============SENGRID========*/

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/api/email/confirmacion', async (req,res, next) =>{
  try{
    res.json(await email.sendOrder(req.body));
  }catch(error){
    next(error);
  }
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message});
  return;
});
/* =============Sengrid========== */

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
routerApi(app);


