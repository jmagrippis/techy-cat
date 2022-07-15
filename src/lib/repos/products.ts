import type Stripe from 'stripe'

export type ProductPrice = {
	id: string
	value: number
}

export type Product = {
	id: string
	name: string
	price: ProductPrice | null
	description: string | null
	features: string[]
}

const mapStripeProductToProduct = (product: Stripe.Product): Product => ({
	id: product.id,
	name: product.name,
	price:
		product.default_price && typeof product.default_price === 'object'
			? {
					id: product.default_price.id,
					value: (product.default_price.unit_amount || 0) / 100,
			  }
			: null,
	description: product.description,
	features: [product.metadata['feature-1'], product.metadata['feature-2']],
})

export class ProductsRepo {
	#client: Stripe

	constructor(client: Stripe) {
		this.#client = client
	}

	getFeatured = async () =>
		await this.#client.products
			.list({
				limit: 2,
				active: true,
				expand: ['data.default_price'],
			})
			.then(({data}) =>
				data
					.map(mapStripeProductToProduct)
					.sort((productA, productB) =>
						productA.price?.value && productB.price?.value
							? productA.price.value - productB.price.value
							: -1
					)
			)
}
