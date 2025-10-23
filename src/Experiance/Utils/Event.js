import * as THREE from 'three'
import EventEmitter from "./EventEmitter"
import gsap from "gsap";

export default class Event extends EventEmitter {
  constructor(ship, camera, controls) {
    super()
    this.ship = ship
    this.camera = camera
    this.controls = controls
    this.count = 0;
    this.maxCount = 30;

    // ================= CONFIG =================
    const maxSpeed = 0.3;
    const accelRate = 0.009;
    const decelRate = 0.05;
    const rotationSpeed = 0.003;
    const bankAmount = 0.4;

    const cameraOffset = new THREE.Vector3(0, .3, -1.);
    const cameraLerp = 0.1;

    let keysPressed = { w: false };
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let mouseInside = true;

    const borderThreshold = 100;
    const edgeYawSpeed = 0.02;
    const edgePitchSpeed = 0.01;

    // Rotation targets
    let targetPitch = 0;
    let targetYaw = 0;

    // Ship speed
    let currentSpeed = 0;

    // ================= INPUT =================
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update target rotation based on mouse movement
      targetYaw -= e.movementX * rotationSpeed;     // left/right
      targetPitch -= e.movementY * rotationSpeed;   // up/down
      targetPitch = THREE.MathUtils.clamp(targetPitch, -Math.PI / 2, Math.PI / 2);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "w") keysPressed.w = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "w") keysPressed.w = false;
    });

    window.addEventListener("mouseenter", () => { mouseInside = true; });
    window.addEventListener("mouseleave", () => {
      mouseInside = false;
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
    });

    // ================= MAIN LOOP =================
    gsap.to({}, {
      duration: 0.016, // ~60fps
      repeat: -1,
      onRepeat: () => {
        if (!ship) return;

        // --- Edge rotation ---
        if (mouseInside) {
          if (mouseX < borderThreshold) targetYaw += edgeYawSpeed;
          else if (mouseX > window.innerWidth - borderThreshold) targetYaw -= edgeYawSpeed;

          if (mouseY < borderThreshold) targetPitch += edgePitchSpeed;
          else if (mouseY > window.innerHeight - borderThreshold) targetPitch -= edgePitchSpeed;
        }

        // --- Smooth rotation ---
        const desiredRoll = THREE.MathUtils.clamp(-(targetYaw - ship.rotation.y) * 0.5, -bankAmount, bankAmount);
        ship.rotation.y = THREE.MathUtils.lerp(ship.rotation.y, targetYaw, 0.08);   // yaw
        ship.rotation.x = THREE.MathUtils.lerp(ship.rotation.x, targetPitch, 0.08); // pitch
        ship.rotation.z = THREE.MathUtils.lerp(ship.rotation.z, desiredRoll, 0.08); // roll/bank

        // --- Smooth forward speed ---
        if (keysPressed.w) currentSpeed = Math.min(currentSpeed + accelRate, maxSpeed);
        else currentSpeed = Math.max(currentSpeed - decelRate, 0);

        // --- Move ship forward along nose (-Z) ---
        const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(ship.quaternion);
        ship.position.addScaledVector(forward, currentSpeed);

        // --- Camera follow ---
        const offset = cameraOffset.clone().applyQuaternion(ship.quaternion);
        const desiredCamPos = ship.position.clone().add(offset);
        camera.position.lerp(desiredCamPos, cameraLerp);

        if (controls) {
          controls.target.copy(ship.position);
          controls.update();
        }
      }
    });


  }
  updateK() {
    // this.update()
  }
}