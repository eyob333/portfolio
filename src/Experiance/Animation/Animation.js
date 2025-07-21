import * as THREE from 'three'
import gsap from "gsap";
import App from "../App";
import Ui from '../Ui/Ui';
// import CustomEase from 'gsap/CustomEase';

// gsap.registerPlugin(CustomEase)

export default class Animation{

    constructor(){
        this.app = new App()
        this.app.resources.on('ready', () =>{
            // this.app.camera.controls.target.copy(this.app.nomad.scene.position)
            this.animateFly();
            // this.animateTake_02();
        })
    }

    animateFly(){
        if (this.app.nomad){
            console.log(this.app)
            this.bones = this.app.nomad.bones
            
            const introTL = gsap.timeline()
            introTL
                .to(this.bones.hips.rotation, {
                    delay: 1,
                    x: THREE.MathUtils.degToRad(130),
                    z: THREE.MathUtils.degToRad(-12),
                    duration: 5,
                    ease: 'back.inOut(4)',
                })
                .to(this.app.camera.instance.position, {
                    x: 20.811740748918215,
                    y: 6.62357903679221,
                    z: 21.41001031130999,
                    duration: 5,
                    ease: 'back.inOut(4)',
                    onComplete: () => {
                        setTimeout( () => {
                            // this.app.camera.controls.target.copy(this.app.nomad.scene.position)
                            let {x, y, z} = this.app.nomad.scene.position
                            gsap.to(this.app.camera.controls.target, {
                                x: x,
                                y: y,
                                z: z,
                                duration: 3
                            })
                            gsap.to(this.app.camera.instance.position, {
                                x: 20.655728905505388, 
                                y: 6.789527319880829,
                                z: 21.52754093837708,
                                delay: 3,
                                duration: 4
    
                            })
                            // this.app.camera.instance.position.set(20.655728905505388, 6.789527319880829,21.52754093837708)
                            let pos = this.app.nomad.scene.position.y + .5
                            gsap.to( this.app.camera.controls.target, {
                                y: pos,
                                duration: 5
                            })
                            // this.app.camera.controls.target.y = this.app.nomad.scene.position.y + .5
                        }, 2000)
                    }
                }, '-=2.5') ;               
            // this.ui = new Ui(document.querySelector("div.section-container-div"));
            const t1 = gsap.timeline({ 
                defaults: {
                    repeat: -1,
                    yoyo: .01,
                    yoyoEase: 'back.out(2)',
                }
            });

            t1
                .to(this.bones.hips.rotation, {
                    z: THREE.MathUtils.degToRad(-5),
                    y: THREE.MathUtils.degToRad(-3),
                    duration: 13, 
                    ease: "slow(0.3,0.4,false)"
                })
            const master = gsap.timeline();
            master
                .add(introTL)
                .add(t1)
        }   
        else{
            return
        }
    }

    animateTake_02(){
        console.log('hello');
        const t2  = gsap.timeline({
            defaults: {
                duration: 5
            }
        });

        // t2 
        //     .to(this.app.camera.instance.position, {
        //         x: 16,
        //         onStart: () => {
        //             this.app.camera.controls.target.set(this.app.nomad.scene.position.copy())
        //         }
        //     },)
            
    }
}





