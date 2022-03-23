const sgMail = require( '@sendgrid/mail' );

sgMail.setApiKey( process.env.SENDGRID_API_KEY );

const sendWelcomeEmail = ( email, name ) => {
	sgMail.send({
		to: email,
		from: 'pozegic.adnan@gmail.com',
		subject: 'Thanks for joining in',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
	});
}

const sendCancelationEmail = ( email, name ) => {
	sgMail.send({
		to: email,
		from: 'pozegic.adnan@gmail.com',
		subject: 'Sorry to see you leave',
		text: `Hey ${name}, we hope you had good time. If there was anything we could do to keep you, please feel free to contact us`,
	});
}

module.exports = {
	sendWelcomeEmail,
	sendCancelationEmail,
}
