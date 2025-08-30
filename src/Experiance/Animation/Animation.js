import * as THREE from 'three'
import gsap from "gsap";
import App from "../App";
import Ui from '../Ui/Ui';

let container = document.querySelector("div.section-container-div");

export default class Animation{

    constructor(){
        this.app = new App();
        this.ui = new Ui();
        this.bones = this.app.nomad.bones
        this.angles = this.app.nomad.angles  
        
        gsap
            .to(this.app.camera.controls.target, {
                y: 10,
                duration: 4,
                ease: 'power2.out',
                onComplete: () =>{
                    container.style.visibility= 'visible';
                    container.style.maxHeight = '100%';
                    container.style.maxWidth = '100%';
                    container.style.overflow = 'auto';
                    this.ui.home.setInstance();
                }
            })
        gsap 
            


    }

}
