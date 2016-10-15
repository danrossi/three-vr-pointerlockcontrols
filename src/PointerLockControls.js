/**
 * @author mrdoob / http://mrdoob.com/
 * @author danrossi / https://github.com/danrossi
 */

class PointerLockControls {

	constructor( camera ) {

		camera.rotation.set(0, 0, 0);

		this.pitchObject = new THREE.Object3D();
		this.pitchObject.add(camera);

		this.yawObject = new THREE.Object3D();
		this.yawObject.position.y = 10;
		this.yawObject.add(pitchObject);

		this.enabled = false;
	}

	static get PI_2() {
		return  Math.PI / 2;
	}

	onMouseMove(event) {

		//if ( this.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		this.yawObject.rotation.y -= movementX * 0.002;
		this.pitchObject.rotation.x -= movementY * 0.002;

		this.pitchObject.rotation.x = Math.max( - PointerLockControls.PI_2, Math.min( PointerLockControls.PI_2, this.pitchObject.rotation.x ) );

	}

	dispose() {
		document.removeEventListener( 'mousemove', this.onMouseMoveRef, false );
	}

	start() {
		this.onMouseMoveRef = (event) => this.onMouseMove(event);
		document.addEventListener( 'mousemove', this.onMouseMoveRef, false );
	}

	getDirection(vector) {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );


		rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );

		vector.copy( direction ).applyEuler( rotation );

		return vector;
	}

	getObject() {
		return this.yawObject;
	}
}

export { PointerLockControls };