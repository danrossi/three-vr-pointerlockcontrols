class PointerLockUtils {

    /**
     * Check for pointerlock api support.
     * @returns {boolean}
     */
    static hasPointerLock() {
        return 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    }

    /**
     * Request the pointer lock api.
     * @param element
     */
    static requestPointerLock(element) {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }

    /**
     * Exit the pointer lock api.
     * @param element
     */
    static exitPointerLock(element) {
        element.exitPointerLock = element.exitPointerLock || element.mozExitPointerLock || element.webkitExitPointerLock;
        element.exitPointerLock();
    }

    /**
     * Check if the current element is locked.
     * @param element
     * @returns {boolean}
     */
    static isPointerLocked(element) {
        return document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element;
    }
}

export { PointerLockUtils };