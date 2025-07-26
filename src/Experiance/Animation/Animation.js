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
            this.bones = this.app.nomad.bones
            console.log(this.app.world.Nomad.Skeleton.getBones())
            // this.app.camera.controls.target.copy(this.app.nomad.scene.position)
            // this.animateFly();
            // this.animateTake_02();
            
            this.float()
        })
    }

    animateFly(){
        if (this.app.nomad){

            const introTL = gsap.timeline()
            introTL
                .to(this.bones.hips.rotation, {
                    // delay: .5,
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
                               x: 18.669794632549852, 
                               y: 5.826238461029424,
                               z: 21.52754093837708,
                                delay: 3,
                                duration: 4
    
                            })
                            // this.app.camera.instance.position.set(20.655728905505388, 6.789527319880829,21.52754093837708)
                            let pos = this.app.nomad.scene.position.y + .5
                            gsap.to( this.app.camera.controls.target, {
                                y: pos,
                                // delay: 3,
                                duration: 5
                            })
                            this.master.pause()
                            this.float()
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
            this. master = gsap.timeline();
            this.master
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
    
    float(){
        let {x, y, z} = this.app.nomad.scene.position
        gsap.to(this.app.camera.controls.target, {
            x: x,
            y: y,
            z: z,
            duration: 3
        })
        gsap.to(this.bones.hips.rotation, {
            x: THREE.MathUtils.degToRad(45),
            y: 0,
            z: 0,
            duration: 2
        })
        const tlCan = gsap.timeline({
            defaults: {
                repeat:-1,
                ease: 'power1.inOut',
                yoyo: true,
                duration: 4,
            }
        });
         /*Can Animation*/
        tlCan
            //move top left
            .to(this.app.nomad.scene.position, {
                y:'-=.07',
                x:'+=.06',  
            })
            
                //move down right
            .to(this.app.nomad.scene.position,{ 
                y:'+=.07', 
                x:'-=.06', 
                duration: 5
            })
            
            .to(this.app.nomad.scene.position,{ 
                y:'-=.06'
            })
            
            .to(this.app.nomad.scene.position,{ 
                y:'+=.06'
            })

    }
}





