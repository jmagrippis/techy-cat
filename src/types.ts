const themes = ['light', 'dark', 'auto'] as const
export type Theme = typeof themes[number]

export const isTheme = (theme: unknown): theme is Theme =>
	typeof theme === 'string' && themes.includes(theme as Theme)
