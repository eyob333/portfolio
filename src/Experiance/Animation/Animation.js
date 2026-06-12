import * as THREE from 'three'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';
import Event from '../Utils/Event';
// import RayCaster from '../Utils/RayCaster';

gsap.registerPlugin(ScrollTrigger)
let container = document.querySelector("div.section-container-div");

export default class Animation{

    constructor(overlay){
        this.app = new App();
        this.ui = new Ui();
        this.slide();
        // this.bones = this.app.nomad.bones
        // this.angles = this.app.nomad.angles  
        this.overlay = overlay

        // this.event = new Event(this.app.ship, this.app.camera.instance, this.app.camera.controls)
        // this.raycast = new RayCaster()

    }

    slide() {
        let slider = document.querySelector('.sliders')  //.sliders slider-hom
        let sliderSections = gsap.utils.toArray('.slider-con') // .slider-cont slider-cont

        let sliderTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 1,
                end: () => "+=" + slider.offsetWidth
            }
        })

        sliderTl
            .to(slider, {
                xPercent: -66
            }, "<")
            // .to('.progress', {
            //     width: '100%'
            // }, "<")

        // sliderSections.forEach((stop, index) => {
        //     const slideText = new SplitType(stop.querySelector('.slide h2'), { types: 'chars' });

        //     sliderTl.from(slideText.chars, {
        //         opacity: 0,
        //         y: 10,
        //         stagger: .03,
        //         scrollTrigger: {
        //             trigger: stop.querySelector('.slide-p'),
        //             start: 'top bottom',
        //             end: 'bottom center',
        //             containerAnimation: sliderTl,
        //             scrub: true,
        //         }
        //     })
        // })


    }

}
