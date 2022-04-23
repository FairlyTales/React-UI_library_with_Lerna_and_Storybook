#!/usr/bin/env node
const postcss = require('rollup-plugin-postcss');
const rollup = require('rollup');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;

const currentWorkingPath = process.cwd();
const {main, name} = require(path.join(currentWorkingPath, 'package.json'));

const inputPath = path.join(currentWorkingPath, main);

const inputOptions = {
	input: inputPath,
	external: ['react'],
	plugins: [
		postcss({
			modules: true,
		}),
		resolve(),
		babel({
			presets: ['@babel/preset-env', '@babel/preset-react'],
			babelHelpers: 'bundled',
		}),
	],
};

const outputOptions = [
	{
		file: `dist/${name}.cjs.js`,
		format: 'cjs',
	},
	{
		file: `dist/${name}.esm.js`,
		format: 'esm',
	},
];

async function build() {
	// create the bundle
	const bundle = await rollup.rollup(inputOptions);

	// create individual bundles
	for (const options of outputOptions) {
		await bundle.write(options);
	}
}

build()
	.then(() => console.log(`${name} build successful`))
	.catch((err) => console.log(err));
