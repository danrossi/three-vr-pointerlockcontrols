import { Euler, EventDispatcher } from "three";
//#region src/utils/PointerLockUtils.js
var PointerLockUtils = class {
	static hasPointerLock() {
		return "pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document;
	}
	static requestPointerLock(element) {
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
		element.requestPointerLock();
	}
	static exitPointerLock(element) {
		element.exitPointerLock = element.exitPointerLock || element.mozExitPointerLock || element.webkitExitPointerLock;
		element.exitPointerLock();
	}
	static isPointerLocked(element) {
		return document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element;
	}
};
//#endregion
//#region src/PointerLockControls.js
var _euler = new Euler(0, 0, 0, "YXZ");
var _PI_2 = Math.PI / 2;
var PointerLockControls = class extends EventDispatcher {
	constructor(camera, scene, element) {
		super();
		this.camera = camera;
		this.scene = scene;
		this.pointerElement = element;
		this.isLocked = false;
		this.minPolarAngle = 0;
		this.maxPolarAngle = Math.PI;
	}
	onMouseMove(event) {
		if (this.isLocked === false) return;
		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		_euler.setFromQuaternion(this.camera.quaternion);
		_euler.y -= movementX * .002;
		_euler.x -= movementY * .002;
		_euler.x = Math.max(_PI_2 - this.maxPolarAngle, Math.min(_PI_2 - this.minPolarAngle, _euler.x));
		this.camera.quaternion.setFromEuler(_euler);
	}
	onPointerLockChange(event) {
		if (PointerLockUtils.isPointerLocked(this.pointerElement)) this.dispatchEvent({ type: "pointerlocked" });
		else {
			this.dispatchEvent({ type: "pointerunlocked" });
			this.dispose();
		}
	}
	onPointerLockError(event) {
		this.dispatchEvent({ type: "pointerlockerror" });
		this.dispose();
	}
	dispose() {
		document.removeEventListener("mousemove", this.onMouseMoveRef, false);
		document.removeEventListener("pointerlockchange", this.onPointerLockChangeRef, false);
		document.removeEventListener("mozpointerlockchange", this.onPointerLockChangeRef, false);
		document.removeEventListener("webkitpointerlockchange", this.onPointerLockChangeRef, false);
		document.removeEventListener("pointerlockerror", this.onPointerLockErrorRef, false);
		document.removeEventListener("mozpointerlockerror", this.onPointerLockErrorRef, false);
		document.removeEventListener("webkitpointerlockerror", this.onPointerLockErrorRef, false);
	}
	disconnect() {
		this.dispose();
	}
	lock() {
		this.onPointerLockChangeRef = (event) => this.onPointerLockChange(event);
		document.addEventListener("pointerlockchange", this.onPointerLockChangeRef, false);
		document.addEventListener("mozpointerlockchange", this.onPointerLockChangeRef, false);
		document.addEventListener("webkitpointerlockchange", this.onPointerLockChangeRef, false);
		this.onPointerLockErrorRef = (event) => this.onPointerLockError(event);
		document.addEventListener("pointerlockerror", this.onPointerLockErrorRef, false);
		document.addEventListener("mozpointerlockerror", this.onPointerLockErrorRef, false);
		document.addEventListener("webkitpointerlockerror", this.onPointerLockErrorRef, false);
		PointerLockUtils.requestPointerLock(this.pointerElement);
	}
	unlock() {
		if (PointerLockUtils.isPointerLocked(this.pointerElement)) PointerLockUtils.exitPointerLock(this.pointerElement);
	}
	connect() {
		this.onMouseMoveRef = (event) => this.onMouseMove(event);
		document.addEventListener("mousemove", this.onMouseMoveRef, false);
	}
	update() {}
};
//#endregion
export { PointerLockControls as default };
