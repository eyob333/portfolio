import * as THREE from 'three'
import gsap from "gsap";
import App from "../App";
import Ui from '../Ui/Ui';

export default class Animation{

    constructor(){
        this.app = new App()
        this.bones = this.app.nomad.bones
        this.angles = this.app.nomad.angles   
        
        gsap.to(this.app.camera.controls.target, {
            y: 10,
            duration: 4,
            ease: 'power2.out'
        })
    }

}
