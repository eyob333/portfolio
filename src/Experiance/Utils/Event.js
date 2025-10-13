import EventEmitter from "./EventEmitter"
import gsap from "gsap";

export default class Event extends EventEmitter {
    constructor(ship) {
        super()
        this.ship = ship
        this.count = 0;
        this.maxCount = 30;


        const maxTilt = 1.3;      // maximum tilt in either direction
        let tiltTarget = 0;       // where we want to tilt
        let tiltTween = null;     // gsap tween reference
        let rotMovtTween = null
        let tiltInterval = null; // interval for "building up" strength
        let posiInterval = null; // interval for "building up" strength
        const tiltStep = 0.05;    // how much tilt adds per step
        const stepTime = 50;      // ms per step (lower = faster build-up)

        let position = {};
        position.x = this.ship.position.x;
        position.y = this.ship.position.y;
        position.z = this.ship.position.z;

        let speed;

        // --- Handle keydown ---
        window.addEventListener("keydown", (e) => {
            if (e.repeat) return; // ignore auto-repeat from holding key
            switch (e.key.toLowerCase()) {
                case "a":
                    clearInterval(tiltInterval);
                    tiltInterval = setInterval(() => {
                        tiltTarget = Math.max(tiltTarget - tiltStep, -maxTilt);
                        if (tiltTween) tiltTween.kill();
                        if (rotMovtTween) rotMovtTween.kill();
                        tiltTween = gsap.to(this.ship.rotation, {
                            z: tiltTarget,
                            y: this.ship.rotation.y + .08,
                            duration: 0.3,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                        rotMovtTween = gsap.to(this.ship.position, {
                            z: this.ship.position.z - .3,
                            x: this.ship.position.x - .5,
                            overwrite: "auto"
                        })
                    }, stepTime);
                    break;

                case "d":
                    clearInterval(tiltInterval);
                    tiltInterval = setInterval(() => {
                        tiltTarget = Math.min(tiltTarget + tiltStep, maxTilt);
                        if (tiltTween) tiltTween.kill();
                        if (rotMovtTween) rotMovtTween.kill();
                        tiltTween = gsap.to(this.ship.rotation, {
                            z: tiltTarget,
                            y: this.ship.rotation.y - .08,
                            duration: 0.3,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                        rotMovtTween = gsap.to(this.ship.position, {
                            z: this.ship.position.z - .3,
                            x: this.ship.position.x + .5,
                            overwrite: "auto"
                        })
                    }, stepTime);
                    break;
                case "w":
                    clearInterval(posiInterval);
                    posiInterval = setInterval(() => {
                        if (rotMovtTween) rotMovtTween.kill();
                        rotMovtTween = gsap.to(this.ship.position, {
                            z: this.ship.position.z - 1,
                            ease : 'power2.out',
                            overwrite: "auto"
                        })
                    }, stepTime - 10);
                    break;
            }
        });

        // --- Handle keyup ---
        window.addEventListener("keyup", (e) => {
            if (["a", "d", "w"].includes(e.key.toLowerCase())) {
                clearInterval(tiltInterval); // stop buildup
                clearInterval(posiInterval)
                tiltTarget = 0; // reset to neutral
                if (tiltTween) tiltTween.kill();
                tiltTween = gsap.to(this.ship.rotation, {
                    z: tiltTarget,
                    duration: 1.5,
                    ease: "power3.out",
                    overwrite: "auto"
                });
            }
        });




    }
}