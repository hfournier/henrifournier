import sgMail from '@sendgrid/mail';
import { env } from '$env/dynamic/private';

export const POST = async ({ request }) => {
	const data = await request.json();

	sgMail.setApiKey(env.SENDGRID_API_KEY);
	const msg: any = {
		to: {
			name: env.MAIL_TO_NAME,
			email: env.MAIL_TO_ADDRESS
		},
		from: {
			name: env.MAIL_FROM_NAME,
			email: env.MAIL_FROM_ADDRESS
		},
		replyTo: {
			name: data.name,
			email: data.email
		},
		subject: data.subject,
		text: data.message
	};

	try {
		// send message with SendGrid
		let result = await sgMail.send(msg);
		return new Response(JSON.stringify({ success: true }), { status: result[0].statusCode });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
