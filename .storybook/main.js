module.exports = {
	"stories": [
		'../packages/**/*.stories.js'
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions"
	],
	"framework": "@storybook/react",
	webpackFinal: async (config) => {
		config.resolve.mainFields = ['src', 'module', 'main'];

		config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');

		config.module.rules.push({
			test: /\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						modules: true,
					},
				},
			],
		});

		return config;
	},
}
