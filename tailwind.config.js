module.exports = {
	content: ['./**/*.jsx'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			// prettier-ignore
			'mainBlue': '#95d7e7',
		},
		extend: {},
	},
	plugins: [],
	corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
