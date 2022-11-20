module.exports = {
	content: ['./**/*.jsx'],
	theme: {
		extend: {
			colors: {
				// prettier-ignore
				'mainBlue': '#95d7e7',
			},
		},
	},
	plugins: [],
	corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
