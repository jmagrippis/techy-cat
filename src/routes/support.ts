import {getServerOnlyEnvVar} from '$lib/getServerOnlyEnvVar'
import {ProductsRepo} from '$lib/repos/products'
import type {RequestHandler} from '@sveltejs/kit'
import Stripe from 'stripe'

const stripeSecretKey = getServerOnlyEnvVar('STRIPE_SECRET_KEY')
if (!stripeSecretKey) {
	throw new Error('STRIPE_SECRET_KEY is not set')
}

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
	typescript: true,
})

export const get: RequestHandler = async () => {
	const productsRepo = new ProductsRepo(stripe)
	const products = await productsRepo.getFeatured()

	return {
		body: {products},
	}
}

export const post: RequestHandler = async ({request, url}) => {
	const priceId = (await request.formData()).get('price-id')

	if (!priceId || typeof priceId !== 'string') {
		return {status: 400}
	}

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${url.origin}/support/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${url.origin}/support?payment-cancelled=true`,
		})

		if (!session.url) {
			return {status: 500}
		}

		return {
			status: 303,
			headers: {
				location: session.url,
			},
		}
	} catch (error) {
		return {status: 500}
	}
}
