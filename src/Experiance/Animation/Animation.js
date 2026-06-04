import * as THREE from 'three'
import gsap from "gsap";
import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';
import Event from '../Utils/Event';
// import RayCaster from '../Utils/RayCaster';

let container = document.querySelector("div.section-container-div");

export default class Animation{

    constructor(overlay){
        this.app = new App();
        this.ui = new Ui();
        // this.bones = this.app.nomad.bones
        // this.angles = this.app.nomad.angles  
        this.overlay = overlay

        // this.event = new Event(this.app.ship, this.app.camera.instance, this.app.camera.controls)
        // this.raycast = new RayCaster()

    }

}
