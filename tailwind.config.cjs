const colors = require('tailwindcss/colors')

const withOpacityValue =
	(varName) =>
	({opacityValue}) =>
		opacityValue === undefined
			? `hsl(var(--${varName}))`
			: `hsla(var(--${varName}) / ${opacityValue})`

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,css,svelte}'],
	theme: {
		colors: {
			primary: colors.fuchsia,
			secondary: colors.emerald,
			copy: {
				base: withOpacityValue('copy-base-color'),
				muted: withOpacityValue('copy-muted-color'),
			},
			surface: {
				1: withOpacityValue('surface-1-color'),
			},
			shadow: {
				1: withOpacityValue('shadow-1-color'),
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
		extend: {},
	},
	plugins: [],
}
