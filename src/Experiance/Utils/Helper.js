function addDebugC(folder, debugObject, name, element, callback, options = {}) {
    if (!folder) return;

    const controller = folder.add(debugObject, name);

    if (options.min !== undefined) controller.min(options.min);
    if (options.max !== undefined) controller.max(options.max);
    if (options.step !== undefined) controller.step(options.step);

    controller.onChange((value) => {
        if (callback && element) {
            callback(element, value);
        }
    });

    return controller;
}

function addDebugColorC(folder, debugObject, name, element, callback) {
    if (!folder) return;

    const controller = folder.addColor(debugObject, name);

    controller.onChange((value) => {
        if (callback && element) {
            callback(element, value);
        }
    });

    return controller;
}

function addDebugSelectC(folder, debugObject, name, options, element, callback) {
    if (!folder) return;

    // Passing options as the third argument to folder.add() creates a dropdown
    const controller = folder.add(debugObject, name, options);

    controller.onChange((value) => {
        if (callback && element) {
            callback(element, value);
        }
    });

    return controller;
}

function trackXHover(element, onMove, onLeave) {
  if (!element || typeof onMove !== 'function') return;

  let isHovering = false; // Tracks state to trigger onLeave only once

  function handleMouseMove(e) {
    const rect = element.getBoundingClientRect();

    // Strict hover check inside viewport bounds
    const isInside = 
      e.clientX >= rect.left && 
      e.clientX <= rect.right && 
      e.clientY >= rect.top && 
      e.clientY <= rect.bottom;

    if (isInside) {
      isHovering = true;

      // Calculate relative X position
      const localX = e.clientX - rect.left;
      const rawX = localX / rect.width;
      
      // Clamp (0 to 1), scale to 13 steps, and round
      const normalizedX = Math.round(Math.max(0, Math.min(1, rawX)) * 12);

      onMove(normalizedX);
    } else if (isHovering) {
      // Triggered only on the frame the mouse crosses outside
      isHovering = false;
      if (typeof onLeave === 'function') {
        onLeave();
      }
    }
  }

  window.addEventListener('mousemove', handleMouseMove);

  return function destroy() {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}
export {trackXHover, addDebugC, addDebugColorC}