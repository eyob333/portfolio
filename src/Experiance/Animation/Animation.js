import * as THREE from 'three'
import gsap from "gsap";
import App from "../App";

export default class Animation{

    constructor(){
        this.app = new App()
        this.app.resources.on('ready', () =>{
            this.animateFly();
        })

    }

    animateFly(){
        if (this.app.nomad){
            console.log(this.app)
            this.bones = this.app.nomad.bones

            gsap.to(this.bones.hips.rotation, {
                    x: THREE.MathUtils.degToRad(130),
                    z: THREE.MathUtils.degToRad(-10),
                    delay: 2,
                    duration: 5.5,
                    ease: 'elastic.inOut',
                })
            gsap.to(this.app.camera.instance.position, {
                x: 17.111,
                delay: 2.5,
                duration: 5,
                ease: 'power4.inOut'
            })
            // const t1 = gsap.timeline({ 
            //     defaults: {
            //         // duration: 3,
            //         repeat: -1,
            //         ease: 'power1.inOut',
            //         yoyo: true,
            //         yoyoEase: 2,
            //     }
            // })
            // t1 
                // .to(this.bones.hips.rotation, {
                //     x: THREE.MathUtils.degToRad(120),
                //     duration: 3
                // })
                // .to(this.bones.leftLeg.rotation, {
                //     z:THREE.MathUtils.degToRad(-174),
                //     duration: 3
                // })
                // .to(this.bones.rightLeg.rotation, {
                //     z:THREE.MathUtils.degToRad(174),
                //     duration: 3
                // })
        }   
        else{
            return
        }
    }
}





