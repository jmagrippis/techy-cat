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
			arcade: ['"Press Start 2P"', 'cursive'],
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
				'fade-in-once': 'fadeIn 1s cubic-bezier(0, 0, 0.2, 1)',
			},
			keyframes: {
				fadeIn: {
					'0%': {opacity: '0', transform: 'translateY(25%)'},
					'100%': {opacity: '1', transform: 'translateY(0)'},
				},
			},
			backgroundImage: {
				'card-back': "url('/svgs/hexagons.svg')",
				'card-front': "url('/svgs/wiggle.svg')",
			},
		},
	},
	plugins: [],
}

module.exports = config
