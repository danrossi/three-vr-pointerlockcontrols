PointerLockControls.js
======================
This is the Three.js PointerLockControls turned into an Es6 module.

Building
========

This is required to be included into the Three.js main app source and built using rollup and babel.

In the main app add

```
export { PointerLockControls } from '../three-vr-pointerlockcontrols/src/PointerLockControls.js';
export { PointerLockUtils } from '../three-vr-pointerlockcontrols/src/utils/PointerLockUtils.js';
```

Install some requirements into the custom Three.js build directory.

```
npm install rollup-plugin-babel rollup-plugin-commonjs rollup-plugin-node-resolve --save-dev
```


In the rollup build config it should look like this

```
const babel = require('rollup-plugin-babel'), nodeResolve = require( 'rollup-plugin-node-resolve' ) , commonjs = require( 'rollup-plugin-commonjs' );


export default {
	entry: 'Three.js',
	dest: 'build/three.js',
	moduleName: 'THREE',
	format: 'umd',
	indent: '\t',
	plugins: [
		glsl(),
		babel({
			externalHelpers: false,
			exclude: './node_modules/**',
			presets: ['es2015-rollup']
		}),
		nodeResolve({
			extensions: ['.js'],
			main: true,
			jsnext: true,
			browser: true,
			preferBuiltins: false
		}),
		commonjs({
			include: './node_modules/**'
		})
	],

	outro: outro,
	footer: footer
};

```

Usage
=====

First check for api support before setup.

```
if (THREE.PointerLockUtils.hasPointerLock()) {
			this.pointerLockControls = new THREE.PointerLockControls( this.camera, this.scene, document.body );
            this.pointerLockControls.addEventListener("pointerlocked", (event) => {
                this.emit("pointerlocked", true);

            });

            this.pointerLockControls.addEventListener("pointerunlocked", (event) => {
                this.emit("pointerlocked", false);

            });

            this.pointerLockControls.addEventListener("pointerlockerror", (event) => {
                this.emit("pointerlocked", false);

            });

}
```

To start pointerlock

```
this.pointerLockControls.start();
```

To manually stop via a custom key command.

```
this.pointerLockControls.stop();
```
