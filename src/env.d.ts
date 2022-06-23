interface ImportMetaEnv {
	readonly VITE_SUPABASE_URL: string
	readonly VITE_SUPABASE_ANON_KEY: string
	readonly VITE_STRIPE_PUBLISHABLE_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
