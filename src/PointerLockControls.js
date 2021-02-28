/**
 * @author mrdoob / http://mrdoob.com/
 * @author danrossi / https://github.com/danrossi
 */

import { EventDispatcher } from '../../three.js/src/core/EventDispatcher';
import { PointerLockUtils } from './utils/PointerLockUtils';

import { Euler } from '../../three.js/src/math/Euler.js';


const euler = new Euler( 0, 0, 0, 'YXZ' ),
PI_2 = Math.PI / 2;

class PointerLockControls extends EventDispatcher {

	/**
	 *
	 * @param {Camera} camera
	 * @param {Scene} scene
	 * @param element the element to lock the pointer to.
	 */
	constructor( camera, scene, element ) {

		super();

		this.camera = camera;
		this.scene = scene;
		this.pointerElement = element;

		this.minPolarAngle = 0; // radians
		this.maxPolarAngle = Math.PI; // radians
	}

	/**
	 * Pointer lock mouse movements. Handles rotation of yaw and pitch.
	 * @param event
	 */
	onMouseMove(event) {

		//if ( this.enabled === false ) return;
		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		euler.setFromQuaternion( this.camera.quaternion );

		euler.y -= movementX * 0.002;
		euler.x -= movementY * 0.002;

		euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );

		euler.x = Math.max( PI_2 - this.maxPolarAngle, Math.min( PI_2 - this.minPolarAngle, euler.x ) );

		this.camera.quaternion.setFromEuler( euler );

	}



	/**
	 * Pointer lock change.
	 * intitiates mouse movements on pointer lock or dispose events on exit.
	 * @param event
	 */
	onPointerLockChange(event) {

		if ( PointerLockUtils.isPointerLocked(this.pointerElement)) {
			

			this.dispatchEvent( { type: "pointerlocked" });

		} else {
			this.dispatchEvent( { type: "pointerunlocked" });

			this.dispose();
		}
	}

	/**
	 * Dispose events on pointer lock error
	 * @param event
	 */
	onPointerLockError(event) {
		this.dispatchEvent( { type: "pointerlockerror" });
		this.dispose();
	}

	/**
	 * Dispose all pointer lock ad mouse events.
	 * Remove the camera from the pitch object.
	 * Remove the yaw object from the scene.
	 */
	dispose() {
		document.removeEventListener( 'mousemove', this.onMouseMoveRef, false );
		document.removeEventListener( 'pointerlockchange', this.onPointerLockChangeRef, false );
		document.removeEventListener( 'mozpointerlockchange', this.onPointerLockChangeRef, false );
		document.removeEventListener( 'webkitpointerlockchange', this.onPointerLockChangeRef, false );

		document.removeEventListener( 'pointerlockerror', this.onPointerLockErrorRef, false );
		document.removeEventListener( 'mozpointerlockerror', this.onPointerLockErrorRef, false );
		document.removeEventListener( 'webkitpointerlockerror', this.onPointerLockErrorRef, false );
	}

	/**
	 * Manually exit pointer lock
	 */
	disconnect() {
		this.dispose();
	}

	lock() {
		this.onPointerLockChangeRef = (event) => this.onPointerLockChange(event);

		document.addEventListener( 'pointerlockchange', this.onPointerLockChangeRef, false );
		document.addEventListener( 'mozpointerlockchange', this.onPointerLockChangeRef, false );
		document.addEventListener( 'webkitpointerlockchange', this.onPointerLockChangeRef, false );

		this.onPointerLockErrorRef = (event) => this.onPointerLockError(event);

		document.addEventListener( 'pointerlockerror', this.onPointerLockErrorRef, false );
		document.addEventListener( 'mozpointerlockerror', this.onPointerLockErrorRef, false );
		document.addEventListener( 'webkitpointerlockerror', this.onPointerLockErrorRef, false );

		//request the pointer lock api with the specified element.
		PointerLockUtils.requestPointerLock(this.pointerElement);
	}

	unlock() {
		if (PointerLockUtils.isPointerLocked(this.pointerElement)) {
			PointerLockUtils.exitPointerLock(this.pointerElement);
		}
	}

	/**
	 * Initiate pointer lock events.
	 * Add the camera to the pitch object.
	 * Add the yaw object to the scene.
	 * Request the pointer lock.
	 */
	connect() {

		this.onMouseMoveRef = (event) => this.onMouseMove(event);
		document.addEventListener( 'mousemove', this.onMouseMoveRef, false );
	}

	update() {
		//dummy update
	}

}

export { PointerLockControls };
