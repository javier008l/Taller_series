const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmailConfirmationHTML(customerName, orderNro){
return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv = "X-UA-compatible" content = "IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Documento</title>
    <style>
      .responsive{
        width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
      <img "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmobile.twitter.com%2Fnacionaloficial&psig=AOvVaw3CiUZ7Gu1-3vvb8uyBDxQ-&ust=1651531008821000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMDI6s6uv_cCFQAAAAAdAAAAABAI"
      class = "responsive"
      alt=""
      />
  </body>
</html>;
`;
}

function getMessage(emailParams){
  return{
    to: emailParams.toEmail,
    from:'javier.1701813899@ucaldas.edu.co',
    subject: 'Confirmacion orden de compra',
    text: `Hola ${emailParams.customerName}, te enviamos imagenes`,
    html: sendEmailConfirmationHTML(
      emailParams.customerName,
      emailParams.orderNro
    ),
  };
}

async function sendOrder(emailParams){
  try{
    await sgMail.send(getMessage(emailParams));
    return {message: 'Confirmacion de compra enviada'};
  }catch(err){
    const message = 'No se pudo enviar la orden. Valide los errores';
    console.error(message);
    console.error(err);
    if(err.response) console.error(err.response.body);
    return{ message };
  }
}

module.exports = {
  sendOrder,
}
