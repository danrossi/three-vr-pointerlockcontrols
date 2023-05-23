export default [
	{
		input: './three-vr-pointerlockcontrols.js',
		external: ['three'],
		plugins: [
		],
		output: [
			{
				format: 'esm',
				file: 'build/three-vr-pointerlockcontrols.module.js'
			}
		]
	}
];
