import GUI from 'lil-gui';

export function setupGUI(camera) {
  const gui = new GUI().close();
  const guiCam = gui.addFolder('camera');
  const posGui = guiCam.addFolder('position');
  const rotGui = guiCam.addFolder('rotation');

  posGui.add(camera.position, 'x', -10, 10).step(0.001).name('x');
  posGui.add(camera.position, 'y', -10, 10).step(0.001).name('y');
  posGui.add(camera.position, 'z', -10, 10).step(0.001).name('z');

  rotGui.add(camera.rotation, 'x', -Math.PI * .5, Math.PI * .5).step(0.01).name('x');
  rotGui.add(camera.rotation, 'y', -Math.PI * .5, Math.PI * .5).step(0.01).name('y');
  rotGui.add(camera.rotation, 'z', -Math.PI * .5, Math.PI * .5).step(0.01).name('z');

  return gui;
}
