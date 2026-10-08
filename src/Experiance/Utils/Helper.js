function addDebugControl(folder, { name, initialValue, min, max, step }, element, callback) {
    if (!folder) return;

    const targetObj = { [name]: initialValue };
    const controller = folder.add(targetObj, name);

    if (min !== undefined) controller.min(min);
    if (max !== undefined) controller.max(max);
    if (step !== undefined) controller.step(step);

    controller.onChange((value) => {
        if (callback && element) callback(element, value);
    });

    return controller;
}


function addDebugColorControl(folder, { name, initialValue }, element, callback) {
    if (!folder) return;

    const targetObj = { [name]: initialValue };
    const controller = folder.addColor(targetObj, name);

    controller.onChange((value) => {
        if (callback && element) callback(element, value);
    });

    return controller;
}