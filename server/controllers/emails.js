const nodemailer = require('nodemailer');
// selecting mail service and authorazing with our credentials
const transport = nodemailer.createTransport({
  // you need to enable the less secure option on your gmail account
  // https://myaccount.google.com/lesssecureapps?pli=1

  // remember to enter your credentials in the .env file
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

const send_email = async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, email, phone, address, subject, message } = req.body;
  const default_subject = 'This is a default subject';
  const mailOptions = {
    // to: field is the destination for this outgoing email, your admin email for example. We can also include several email in an array, for example admin's email and user's email from the form
    to: [process.env.DESTINATION_EMAIL, email],
    replyTo:email,
    subject: 'New message from ' + firstname + ' ' + lastname,
    html: '<p>'+ 'Title:' + (subject || default_subject) + '</p>'+
    '<p><pre>'+message+'</pre></p>'+
    '<p>' + 'Email:' +email+'</p>'+
    '<p>' + 'Phone:' +phone+'</p>'+
    '<p>'+ 'Address:' + address+'</p>'
  }}

  const send_email_confirm = async (req, res) => {
    
    console.log(req.body)
    const { name, email, products } = req.body;
    console.log(products)
    const default_subject = 'Thank you for your order';
    const mailOptions = {
      // to: field is the destination for this outgoing email, your admin email for example. We can also include several email in an array, for example admin's email and user's email from the form
      to: [process.env.DESTINATION_EMAIL, email],
      replyTo:process.env.DESTINATION_EMAIL,
      subject: name + ', thank you for your order',
      html: `<span><p>Title: ${(default_subject)}</p>
      <p><pre>Thank you for placing order at Vina T&T</pre></p>
      <p>${email}</p>
      <p>Here is the list of your products</p>
      <div id="prods"></div>
      </span>
      <script>
      let productsHTML = '';
      for (var i=0; i <= ${products.length} ; i++) 
      productsHTML = productsHTML + <b>Name: ${products[i].name} Price:${products[i].price} Quantity:   ${products[i].quantity}</b>
      }
      document.getElementById('prods').innerHTML = productsHTML;
      </script>
      `
    }
 
  try {
    const success = await transport.sendMail(mailOptions)
    console.log("success:", success)
    return res.json({ ok: true, message: 'email sent' });
  } catch (err) {
    console.log(err)
    return res.json({ ok: false, message: err });
  }
};

module.exports = { send_email,send_email_confirm };
