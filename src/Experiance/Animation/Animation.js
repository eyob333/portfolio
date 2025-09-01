import * as THREE from 'three'
import gsap from "gsap";
import App from "../App";
import Ui from '../Ui/Ui';

let container = document.querySelector("div.section-container-div");
let scrollNav = document.querySelector('div.navigaton-bar')

export default class Animation{

    constructor(){
        this.app = new App();
        this.ui = new Ui();
        this.bones = this.app.nomad.bones
        this.angles = this.app.nomad.angles  

        const t1 = gsap.timeline({
            defaults: {
                duration: 2,
                ease: 'power1.inOut'
            }
        })
        
        t1
            .to(this.app.camera.controls.target, {
                y: 9.5,
                duration: 2,
                ease: 'power2.out',
                onComplete: () =>{
                    container.style.visibility= 'visible';
                    container.style.maxHeight = '100vh';
                    container.style.maxWidth = '100%';
                    container.style.overflow = 'auto';
                    container.style.scrollbarWidth= 'none';
                    this.ui.home.setInstance();
                }
            })
            .to(this.app.world.Enviromet.params, {
                alpha: 0, 
                onUpdate: () =>{
                    this.app.renderer.instance.setClearAlpha(this.app.world.Enviromet.params.alpha)
                }
            })
            .to(this.app.camera.instance.position, {
                x:1.7451, y: 10.9374, z:-2.2750,
                duration: 4,
                ease: 'power4.out'
            }, '>-2')
             .to(this.app.camera.controls.target, {
                y: 10.3,
                ease: 'power1.inOut',
                onComplete: () =>{
                    gsap.to( scrollNav, {
                        scaleY: 1,
                        duration: 1.5,
                        ease: "expoScale(0.5,7,none)"
                    })
                }
            }, '<')
            


    }

}
