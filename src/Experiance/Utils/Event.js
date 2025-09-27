import EventEmitter from "./EventEmitter"
import gsap from "gsap";

export default class Event extends EventEmitter{
    constructor(ship){
        super()
        this.ship = ship
        // this.width = window.innerWidth
        // this.height = window.innerHeight
        // this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // window.addEventListener('resize', () => {
        //     this.width = window.innerWidth
        //     this.height = window.innerHeight
        //     this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            
        //     this.trigger('resize')
        // })
        this.count = 0;
        this.maxCount = 30;


        const maxTilt = 1.3;      // maximum tilt in either direction
        let tiltTarget = 0;       // where we want to tilt
        let tiltTween = null;     // gsap tween reference
        let tiltInterval = null;  // interval for "building up" strength
        const tiltStep = 0.05;    // how much tilt adds per step
        const stepTime = 50;      // ms per step (lower = faster build-up)

        // --- Handle keydown ---
        window.addEventListener("keydown", (e) => {
            if (e.repeat) return; // ignore auto-repeat from holding key
            switch (e.key.toLowerCase()) {
                case "a":
                    clearInterval(tiltInterval);
                    tiltInterval = setInterval(() => {
                        tiltTarget = Math.max(tiltTarget - tiltStep, -maxTilt);
                        if (tiltTween) tiltTween.kill();
                        tiltTween = gsap.to(this.ship.rotation, {
                            z: tiltTarget,
                            duration: 0.3,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                    }, stepTime);
                    break;

                case "d":
                    clearInterval(tiltInterval);
                    tiltInterval = setInterval(() => {
                        tiltTarget = Math.min(tiltTarget + tiltStep, maxTilt);
                        if (tiltTween) tiltTween.kill();
                        tiltTween = gsap.to(this.ship.rotation, {
                            z: tiltTarget,
                            duration: 0.3,
                            ease: "power1.out",
                            overwrite: "auto"
                        });
                    }, stepTime);
                    break;
            }
        });

        // --- Handle keyup ---
        window.addEventListener("keyup", (e) => {
            if (["a", "d"].includes(e.key.toLowerCase())) {
                clearInterval(tiltInterval); // stop buildup
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


        // window.addEventListener('keypress', e =>{
        //     switch(e.key.toLocaleLowerCase()) {
        //         case 'w':
        //         case 'a':
        //         case 's':
        //         case 'd':
        //             this.key = e.key.toLocaleLowerCase()
        //             console.log("triggred event", e)
        //             this.count += 1;
        //             this.trigger("keyPress")
        //             break;
        //     }
            
        // } )

        // window.addEventListener('mousemove', e =>{
        //     this.trigger("mouseMove")
        // })

    }
}