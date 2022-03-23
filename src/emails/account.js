const sendgridAPIKey = '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';
const sgMail = require( '@sendgrid/mail' );

sgMail.setApiKey( sendgridAPIKey );

const sendWelcomeEmail = ( email, name ) => {
	sgMail.send({
		to: email,
		from: 'pozegic.adnan@gmail.com',
		subject: 'Thanks for joining in',
		text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
		html: ""
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
