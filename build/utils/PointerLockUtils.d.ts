export class PointerLockUtils {
    /**
     * Check for pointerlock api support.
     * @returns {boolean}
     */
    static hasPointerLock(): boolean;
    /**
     * Request the pointer lock api.
     * @param element
     */
    static requestPointerLock(element: any): void;
    /**
     * Exit the pointer lock api.
     * @param element
     */
    static exitPointerLock(element: any): void;
    /**
     * Check if the current element is locked.
     * @param element
     * @returns {boolean}
     */
    static isPointerLocked(element: any): boolean;
}
