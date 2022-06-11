const colors = require('tailwindcss/colors')

const withAlphaValue = (varName) => `hsl(var(--${varName}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,css,svelte}'],
	theme: {
		colors: {
			primary: colors.fuchsia,
			secondary: colors.emerald,
			copy: {
				base: withAlphaValue('copy-base-color'),
				muted: withAlphaValue('copy-muted-color'),
			},
			surface: {
				1: withAlphaValue('surface-1-color'),
				2: withAlphaValue('surface-2-color'),
			},
			shadow: {
				1: withAlphaValue('shadow-1-color'),
			},
			gray: colors.stone,
			white: colors.white,
			transparent: 'transparent',
			current: 'currentColor',
		},
		fontFamily: {
			sans: ['Overpass', 'sans-serif'],
		},
		fontWeight: {
			thin: 100,
			normal: 400,
			semibold: 600,
		},
		container: {
			center: true,
		},
		extend: {
			animation: {
				'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1)',
			},
		},
	},
	plugins: [],
}

module.exports = config
