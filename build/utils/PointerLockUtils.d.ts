export class PointerLockUtils {
    /**
     * Check for pointerlock api support.
     * @returns {boolean}
     */
    static hasPointerLock(): boolean;
    /**
     * Request the pointer lock api.
     * @param {HTMLElement} element
     * @returns {Promise<void>}
     */
    static requestPointerLock(element: HTMLElement): Promise<void>;
    /**
     * Exit the pointer lock api.
     * @param {HTMLElement} element
     */
    static exitPointerLock(element: HTMLElement): void;
    /**
     * Check if the current element is locked.
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    static isPointerLocked(element: HTMLElement): boolean;
}
