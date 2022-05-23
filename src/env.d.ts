interface ImportMetaEnv {
	// NEVER EXPOSE
	readonly NOTION_TOKEN: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
