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
     * @param {MouseEvent} event - the mouse event
     */
    onMouseMove(event: MouseEvent): void;
    /**
     * Pointer lock change.
     * intitiates mouse movements on pointer lock or dispose events on exit.
     * @param {Event} event
     */
    onPointerLockChange(event: Event): void;
    /**
     * Dispose events on pointer lock error
     * @param {Event} event
     */
    onPointerLockError(event: Event): void;
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
    /**
     * Pointer lock change
     * @private
     * @param {Event} event
     */
    private onPointerLockChangeRef;
    /**
     * Pointer lock error
     * @private
     * @param {Event} event
     */
    private onPointerLockErrorRef;
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
