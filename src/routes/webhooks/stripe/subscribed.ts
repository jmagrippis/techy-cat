import {getServerOnlyEnvVar} from '$lib/getServerOnlyEnvVar'
import type {RequestHandler} from '@sveltejs/kit'
import Stripe from 'stripe'

const stripeSecretKey = getServerOnlyEnvVar('STRIPE_SECRET_KEY')
const endpointSecret =
	'whsec_3c53391609f1f6ba0557916db0316127a4832db4d49009f3a8159ac5426bb3a3'
if (!stripeSecretKey) {
	throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
	typescript: true,
})

export const post: RequestHandler = async ({request}) => {
	const stripeSignature = request.headers.get('stripe-signature')
	if (!request.body || !stripeSignature) {
		return {status: 400}
	}

	try {
		const event = stripe.webhooks.constructEvent(
			await request.text(),
			stripeSignature,
			endpointSecret
		)

		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object
				console.log('handling event')
				console.log('session', session)
				console.log('event.data', event.data)

				// IMPLEMENT HERE
				return {status: 200}
			}
			default:
				console.log(`Unhandled event type ${event.type}`)
				return {status: 400}
		}
	} catch (error) {
		console.log('something went wrong handling webhook event', error)
		return {status: 400}
	}
}
