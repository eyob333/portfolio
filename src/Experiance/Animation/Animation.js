import * as THREE from 'three'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';
import { TextPlugin } from 'gsap/all';

import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';
import Event from '../Utils/Event';

// import RayCaster from '../Utils/RayCaster';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin)
let container = document.querySelector("div.section-container-div");

export default class Animation{

    constructor(overlay){
        this.app = new App();
        this.ui = new Ui();
        this.slide();
        this.setUi();

        let nav = {
            prev_sv: '',
            prev_p: '',
            prev_tp: ''
        }
        this.app.event = {
            nav
        }

        this.nav = this.app.event.nav
        this.nav_select();
        this.scroll_trig()
        this.setEvent()

        this.overlay = overlay

        // this.event = new Event(this.app.ship, this.app.camera.instance, this.app.camera.controls)
        // this.raycast = new RayCaster()


        // let btn = document.querySelector('.smthin')
        // btn.addEventListener('click', () =>{
        //     history.replaceState(null, "", `#${"home"}`);
        //     let targetDiv = document.querySelector('#lab')
        //     targetDiv.scrollIntoView({
        //         behavior: "smooth", // Options: "smooth" (animated) or "auto" (instant snap)
        //         block: "start",     // Aligns the top of the div to the top of the window
        //         inline: "nearest"   // Handles horizontal alignment if necessary
        //     });
        // })

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
                end: () => "+=" + (slider.scrollWidth - window.innerWidth * 1.3),
                invalidateOnRefresh: true
            }
        })

        sliderTl
            .to(slider, {
                x: () => -(slider.scrollWidth - window.innerWidth)
            }, "<")
            .to('.slider-line', {
                scaleX: 1,

            },"<")




        let s1Elements = document.querySelectorAll('.slider');
   

        s1Elements.forEach((s1) => {
            let lockedE = s1.querySelector('.wo-am')
            let sliderT2 = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: s1,       // Tracks this specific element
                    pin: true,         // Pins this specific element
                    scrub: 1,
                    end: () => "+=" + (s1.scrollWidth - window.innerWidth * 1.3),
                    invalidateOnRefresh: true,
                    onUpdate: (self) =>{
                        console.log(Math.round(self.progress * 100 * 10)/ 10)
                        if (lockedE)
                        gsap.to(lockedE.querySelector('h3'),{
                            ease: "none",
                            innerText: `${Math.round(self.progress * 100)}%`,
                            snap: 'innerText',
                            duration: .4
                        });

                    }
                }
                
            });

            sliderT2.to(s1, {
                x: () => -(s1.scrollWidth - window.innerWidth)
            }, "<");

            if( lockedE){
                sliderT2.to(lockedE, {
                    x: () =>(s1.scrollWidth -window.innerWidth),
                }, '<')                
            }

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


    nav_change(sp, p1, pa, to_view) {
        let spar = sp;
        let p = p1;
        let par = pa;

        let prev_p = this.nav.prev_p
        let prev_spar = this.nav.prev_spar
        let prev_par = this.nav.prev_par


        if (prev_p && prev_par  && prev_spar ) {
            gsap.to(prev_spar, {
                width: '50px',
                height: '20px'
            })
            gsap.to(prev_par, {
                width: '0%'
            })
            gsap.to(prev_p, {
                fontSize: '0rem'
            })
        }

        gsap.to(spar, {
            width: '70px',
            height: '30px'
        })
        gsap.to(par, {
            width: '100%'
        })
        gsap.to(p, {
            fontSize: '1.4rem'
        })

        this.nav.prev_p = p;
        this.nav.prev_spar = spar;
        this.nav.prev_par = par;


        if (to_view){
            let target = to_view.target;
            // target.scrollIntoView({
            //     behavior: "smooth", // Options: "smooth" (animated) or "auto" (instant snap)
            //     block: "start",     // Aligns the top of the div to the top of the window
            //     inline: "nearest"   // Handles horizontal alignment if necessary
            // });
            gsap.to( window, {
                scrollTo: `#${target}`,
                scrollBehavior: 'smooth',
            })

        }
    }


    nav_select() {
        let element = document.querySelectorAll('.nav-mask')
        element.forEach(e => {
            e.addEventListener('click', e => {
                console.log(e.target)

                let spar = e.target.children[0].children[0]
                let par = e.target.children[1]
                let p = par.children[0]

                let k = e.target.classList[1].split('-')[0]
                console.log(k)
                let to_view = {
                    target: k
                }

                this.nav_change(spar, p, par, to_view);

            })
        });

    }

   
    scroll_trig(){
        let scrollArr = gsap.utils.toArray('section')
        console.log(scrollArr);

        // console.log(sc)

        scrollArr.forEach( (arr, j) =>{
            console.log(`foo ${j}`, arr)

            let elK = document.querySelector(`.${arr.id}-nav-to`)
            console.log("foo", elK)

            let spar = elK.children[0].children[0]
            let par = elK.children[1]
            let p = par.children[0]

            ScrollTrigger.create({
                trigger: arr,
                // markers: true,
                start: 'top 5.3%',
                end: "bottom 60%",
                onEnter: ()=>{
                    this.nav_change(spar, p, par)
                },
                onEnterBack: () =>{
                    this.nav_change(spar,p, par)
                }
            })
        })

    }


    setUi(){
        let element = document.querySelector('.main-icon svg');
        gsap.to(element, {
            y: 20
        })
    }

    setEvent(){
        let element = document.querySelector(".util .theme .icons-t")
        console.log(element)

        element.addEventListener('click', (e) =>{
            console.log("yo")
            gsap.to( element, {
                rotate: '+=180deg'
            })
        })
    }




}
