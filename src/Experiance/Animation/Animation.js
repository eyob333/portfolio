import * as THREE from 'three'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';
import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';
import Event from '../Utils/Event';
// import RayCaster from '../Utils/RayCaster';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
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


        let btn = document.querySelector('.smthin')
        btn.addEventListener('click', () =>{
            history.replaceState(null, "", `#${"home"}`);
            let targetDiv = document.querySelector('#lab')
            targetDiv.scrollIntoView({
                behavior: "smooth", // Options: "smooth" (animated) or "auto" (instant snap)
                block: "start",     // Aligns the top of the div to the top of the window
                inline: "nearest"   // Handles horizontal alignment if necessary
            });
        })

    }

    slide() {
        // let wk = document.querySelector('now');
        // ScrollTrigger.create({
        //     trigger: "#project",
        //     // start: "top bottom", // Triggers when the top of the div hits the bottom of the viewport
        //     markers: true,
        //     onEnter: () => {
        //         console.log("Entered the view via GSAP!");
        //     },
        //     onLeaveBack: () => {
        //         console.log("Scrolled back up, left the view.");
        //     }
        // });


        let slider = document.querySelector('.slider-hom')  //.sliders
        let sliderSections = gsap.utils.toArray('.slider-cont') // .slider-cont

        let sliderTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 1,
                end: () => "+=" + slider.offsetWidth,
            }
        })

        sliderTl
            .to(slider, {
                xPercent: -66
            }, "<")



        let s1Elements = document.querySelectorAll('.sliders');
        let k = gsap.utils.toArray(".tab-overflow")

        k.forEach( e =>{
            gsap.set(e, {
                minWidth: 0,
                minHeight: 0
            })
        })

        // 2. Loop through each individual slider element
        s1Elements.forEach((s1) => {
            let sliderT2 = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: s1,       // Tracks this specific element
                    pin: true,         // Pins this specific element
                    scrub: 1,
                    end: () => "+=" + s1.offsetWidth,
                    onEnter: () =>{
                        k.forEach( e =>{
                            gsap.to(e, {
                                minWidth: '100vw',
                                height: '100vh',
                                })
                            })

                        },
                    onLeave: () =>{
                        k.forEach( e =>{
                            gsap.to(e, {
                                minWidth: '0vw',
                                height: '0vh',
                                })
                            })
                        }
                    }
                
            });

            sliderT2.to(s1, {
                xPercent: -66
            }, "<");
        });


        // let s2 = document.querySelector('.slider-cont')
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
