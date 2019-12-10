/**
 * @author mrdoob / http://mrdoob.com/
 * @author danrossi / https://github.com/danrossi
 */

import { EventDispatcher } from '../../three.js/src/core/EventDispatcher';
import { PointerLockUtils } from './utils/PointerLockUtils';

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

		//this.pitchObject = new THREE.Object3D();
		//this.pitchObject.add(camera);

		//this.yawObject = new THREE.Object3D();
		//this.yawObject.position.y = 10;
		//this.yawObject.add(this.pitchObject);
	}

	/**
	 * Pointer lock mouse movements. Handles rotation of yaw and pitch.
	 * @param event
	 */
	onMouseMove(event) {

		//if ( this.enabled === false ) return;
		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		//this.yawObject.rotation.y -= movementX * 0.002;
		//this.pitchObject.rotation.x -= movementY * 0.002;

		//this.pitchObject.rotation.x = Math.max( - PointerLockControls.PI_2, Math.min( PointerLockControls.PI_2, this.pitchObject.rotation.x ) );

		//update the camera rotation directly.
		//var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
		//rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
		//this.camera.setRotationFromEuler(rotation);

		euler.setFromQuaternion( this.camera.quaternion );

		euler.y -= movementX * 0.002;
		euler.x -= movementY * 0.002;

		euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) );

		this.camera.quaternion.setFromEuler( euler );


	}



	/**
	 * Pointer lock change.
	 * intitiates mouse movements on pointer lock or dispose events on exit.
	 * @param event
	 */
	onPointerLockChange(event) {

		if ( PointerLockUtils.isPointerLocked(this.pointerElement)) {
			this.onMouseMoveRef = (event) => this.onMouseMove(event);
			document.addEventListener( 'mousemove', this.onMouseMoveRef, false );

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

		//this.pitchObject.remove(this.camera);
		//this.scene.remove(this.yawObject);


		//update the camera to the current pointer control position.
		//var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
		//rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
		//this.camera.setRotationFromEuler(rotation);
	}

	/**
	 * Manually exit pointer lock
	 */
	stop() {
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
	start() {

		this.onPointerLockChangeRef = (event) => this.onPointerLockChange(event);

		document.addEventListener( 'pointerlockchange', this.onPointerLockChangeRef, false );
		document.addEventListener( 'mozpointerlockchange', this.onPointerLockChangeRef, false );
		document.addEventListener( 'webkitpointerlockchange', this.onPointerLockChangeRef, false );

		this.onPointerLockErrorRef = (event) => this.onPointerLockError(event);

		document.addEventListener( 'pointerlockerror', this.onPointerLockErrorRef, false );
		document.addEventListener( 'mozpointerlockerror', this.onPointerLockErrorRef, false );
		document.addEventListener( 'webkitpointerlockerror', this.onPointerLockErrorRef, false );


		//update the rotations from the camera.
		//this.yawObject.rotation.y = this.camera.rotation.y;
		//this.pitchObject.rotation.x = this.camera.rotation.x;

		//reset the camera, this could be changed to the current position ?
		//this.camera.rotation.set(0, 0, 0);

		//add these on demand so they don't interfere with other controls.
		//this.pitchObject.add(this.camera);
		//this.scene.add(this.yawObject);

		//request the pointer lock api with the specified element.
		PointerLockUtils.requestPointerLock(this.pointerElement);

	}

	/*getDirection(vector) {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );


		rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );

		vector.copy( direction ).applyEuler( rotation );

		return vector;
	}

	getObject() {
		return this.yawObject;
	}*/
}

export { PointerLockControls };

