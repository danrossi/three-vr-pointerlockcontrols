class PointerLockUtils {
  /**
   * Check for pointerlock api support.
   * @returns {boolean}
   */
  static hasPointerLock() {
    return (
      'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document
    );
  }

  /**
   * Request the pointer lock api.
   * @param {HTMLElement} element
   * @returns {Promise<void>}
   */
  static async requestPointerLock(element) {
    element.requestPointerLock =
      element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;
    return element.requestPointerLock();
  }

  /**
   * Exit the pointer lock api.
   * @param {HTMLElement} element
   */
  static exitPointerLock(element) {
    element.exitPointerLock =
      element.exitPointerLock ||
      element.mozExitPointerLock ||
      element.webkitExitPointerLock;
    element.exitPointerLock();
  }

  /**
   * Check if the current element is locked.
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  static isPointerLocked(element) {
    return (
      document.pointerLockElement === element ||
      document.mozPointerLockElement === element ||
      document.webkitPointerLockElement === element
    );
  }
}

export { PointerLockUtils };
