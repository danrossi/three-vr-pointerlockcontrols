import { EventDispatcher, Camera, Scene } from 'three';
export default class PointerLockControls extends EventDispatcher<any> {
    /**
     *
     * @param {Camera} camera
     * @param {Scene} scene
     * @param {HTMLElement} element the element to lock the pointer to.
     */
    constructor(camera: Camera, scene: Scene, element: HTMLElement);
    camera: Camera;
    scene: Scene;
    pointerElement: HTMLElement;
    isLocked: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    /**
     * Pointer lock mouse movements. Handles rotation of yaw and pitch.
     * @param {any} event
     */
    onMouseMove(event: any): void;
    /**
     * Pointer lock change.
     * intitiates mouse movements on pointer lock or dispose events on exit.
     * @param {any} event
     */
    onPointerLockChange(event: any): void;
    /**
     * Dispose events on pointer lock error
     * @param {any} event
     */
    onPointerLockError(event: any): void;
    /**
     * Dispose all pointer lock ad mouse events.
     * Remove the camera from the pitch object.
     * Remove the yaw object from the scene.
     */
    dispose(): void;
    /**
     * Manually exit pointer lock
     */
    disconnect(): void;
    lock(): void;
    onPointerLockChangeRef: ((event: any) => void) | undefined;
    onPointerLockErrorRef: ((event: any) => void) | undefined;
    unlock(): void;
    /**
     * Initiate pointer lock events.
     * Add the camera to the pitch object.
     * Add the yaw object to the scene.
     * Request the pointer lock.
     */
    connect(): void;
    onMouseMoveRef: ((event: any) => void) | undefined;
    update(): void;
}
