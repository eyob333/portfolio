import * as THREE from 'three'
import Lenis from 'lenis'
import gsap from "gsap";

import { ScrollTrigger } from 'gsap/all';
import { ScrollToPlugin } from 'gsap/all';

import SplitType from 'split-type';
import App from "../App";
import Ui from '../Ui/Ui';


let container = document.querySelector("div.section-container-div");


export default class Animation {

    constructor() {
        this.app = new App();
        this.setCursor()
        this.ui = new Ui();
        this.slide();
        this.setUi();
        this.device = this.app.sizes.device.mobile;

        let nav = {
            prev_sv: '',
            prev_p: '',
            prev_tp: ''
        }
        let hash = {
            prevH: '',
        }
        this.app.event = {
            nav,
            hash
        }

        this.nav = this.app.event.nav
        this.nav_select();
        this.scroll_trig()
        this.setEvent()


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

    nav_hash() {

    }

    slide() {

        let slider = document.querySelector('.slider-hom')

        let sliderTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                end: () => "+=" + (slider.scrollWidth - window.innerWidth * 1),
                invalidateOnRefresh: true,


            }
        })

        sliderTl
            .to(slider, {
                x: () => -(slider.scrollWidth - window.innerWidth),
            }, "<")
            .to('.slider-line', {
                scaleX: 1,

            }, "<")


        let s1Elements = document.querySelectorAll('.slider');



        s1Elements.forEach((s1) => {
            const lockedE = s1.querySelector('.wo-am')
            const pts = s1.querySelector('.wo-spacer svg')
            const cards = s1.querySelectorAll('.slider-cont');

            const par = s1.querySelectorAll('.slider-cont .s-name h2')
            const wi =  s1.attributes.getNamedItem('base').value

  


            const sliderT2 = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: s1,       // Tracks this specific element
                    pin: true,         // Pins this specific element
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (cards.length - wi), // Snaps relative to total panels, 
                        duration: { min: 0.15, max: 0.4 }, // Faster snap recovery
                        delay: 0.15,                       // Brief delay before snapping engages
                        ease: 'power1.inOut'
                    },
                    anticipatePin: 1,
                    end: () => "+=" + ((s1.scrollWidth - s1.clientWidth)),
                    invalidateOnRefresh: true,
                }

            });



            sliderT2.to(s1, {
                x: () => -(s1.scrollWidth - s1.clientWidth),
            }, "<");

            if (lockedE) {
                sliderT2.to(lockedE, {
                    x: () => (s1.scrollWidth - s1.clientWidth),
                }, '<')
            }

            cards.forEach((card) => {
                const para = card.querySelector('.s-name h2');
                const ima = card.querySelector('.s-name h2');
                const line = card.querySelector('.s-name h2');
                const numb = card.querySelector('.s-name h2');
                const icons = card.querySelectorAll('.s-name h2');
                if (!para) return;

                // Set initial state
                gsap.set(para, { opacity: 0, y: 40 });

                // Individual trigger per card using the horizontal container as context
                gsap.to(para, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: sliderT2, // CRITICAL: Links card animation to the parent horizontal timeline!
                        start: "left center",         // Triggers when the card hits the center of the screen
                        toggleActions: "play reverse play reverse", // Fades in when scrolling forward, fades out going back
                    }
                });
            });



        });




    }


    nav_change(sp, p1, pa, to_view, hash) {
        let spar = sp;
        let p = p1;
        let par = pa;

        let prev_p = this.nav.prev_p
        let prev_spar = this.nav.prev_spar
        let prev_par = this.nav.prev_par

        let pk = this.device ? 35 : 50;
        let pi = this.device ? 25 : 30;


        history.replaceState(null, "", `#${hash}`);
        // console.log("foo hash", hash)


        if (prev_p && prev_par && prev_spar) {
            gsap.to(prev_spar, {
                width: `${pi}px`,
                height: `${pi}px`,
                transformOrigin: 'bottom'
            })
            gsap.to(prev_par, {
                // width: '0%'
                scale: 0
            })
            if (!this.device) {
                gsap.to(prev_p, {
                    fontSize: '0rem'
                })
            }

        }

        gsap.to(spar, {
            width: `${pk}px`,
            height: `${pk}px`
        })
        gsap.to(par, {
            // width: '100%'
            scale: 1
        })
        if (!this.device) {
            gsap.to(p, {
                fontSize: '1.1rem'
            })
        }


        this.nav.prev_p = p;
        this.nav.prev_spar = spar;
        this.nav.prev_par = par;


        if (to_view) {
            let target = to_view.target;
            // target.scrollIntoView({
            //     behavior: "smooth", // Options: "smooth" (animated) or "auto" (instant snap)
            //     block: "start",     // Aligns the top of the div to the top of the window
            //     inline: "nearest"   // Handles horizontal alignment if necessary
            // });
            gsap.to(window, {
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
                // console.log("rru",k)
                // this.app.event.hash = k
                let to_view = {
                    target: k
                }

                this.nav_change(spar, p, par, to_view, k);

            })
        });

    }


    scroll_trig() {
        let scrollArr = gsap.utils.toArray('section')
        // console.log(scrollArr);

        scrollArr.forEach((arr, j) => {
            // console.log(`foo ${j}`, arr)

            let elK = document.querySelector(`.${arr.id}-nav-to`)
            // console.log("foo elk", arr.id)

            let spar = elK.children[0].children[0]
            let par = elK.children[1]
            let p = par.children[0]

            // let k = par.classList[1].split('-')[0]

            ScrollTrigger.create({
                trigger: arr,
                // markers: true,
                start: 'top 5.3%',
                end: "bottom 60%",
                onEnter: () => {
                    this.nav_change(spar, p, par, null, arr.id)
                },
                onEnterBack: () => {
                    this.nav_change(spar, p, par, null, arr.id)
                }
            })
        })

        let introTrig = gsap.utils.toArray('section .intro-header')
        // let introTimel = gsap.timeline( {defaults: {
        //     scrollTrigger: {
        //         trigger: introTrig,
        //         markers: true
        //     }
        // }})

        introTrig.forEach(e => {
            const t = gsap.timeline({
                defaults: {
                    trigger: e,
                    marker: true,
                    start: 'top 5.3%',
                    end: "bottom 60%",
                }
            })
        });
        console.log(introTrig)



    }


    setUi() {
        let element = document.querySelector('.main-icon svg');
        gsap.to(element, {
            y: 20
        })

        let title_c = gsap.utils.toArray('.nav-mask .title-cont')
        title_c.forEach(e => {
            gsap.to(e, {
                scale: 0,
            })

        });

    }

    setEvent() {
        let device = this.app.sizes.device;
        let element = document.querySelector(".util .theme .icons-t")
        console.log(element)

        element.addEventListener('click', (e) => {
            console.log("yo")
            gsap.to(element, {
                rotate: '+=180deg'
            })
        })



        /* window.addEventListener('scroll', () => {

            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                
            }, 250);
      }) */

        const homC = document.querySelector('#nav .main-icon .icon-mask')
        homC.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: `#home`,

            })

        })

        const pts = gsap.utils.toArray('.wo-spacer svg')
        console.log(pts)

        /* 
        const dfs = document.querySelector('#labs .wo-spacer svg')    
        const cts = document.querySelector('#project .wo-spacer svg')
        const mts = document.querySelector('#models .wo-spacer svg')

        let base;

        const cs = document.querySelector('p1', 'p2');
        base = 32;


        const c2 = dfs.querySelector('.p3')
        console.log('foo str', c2.attributes.getNamedItem("x").value)
        const p2 = dfs.querySelector('.p3');
        const m2 = mts.querySelector('.p2')
        const targetPx = 8-436;
        const tpc = 55 - 257;
        const tmc = -113- 86

        const calp = (tmc / m2.getBBox().width) * 100; // Result: -125
        gsap.set(m2, {
            xPercent: calp,
            rotation:  360,
    

        })
        gsap.to( m2, {
            xPercent: 0,
            duration: 2,
            rotation: 0,
            ease: 'back.in(4)',
            transformOrigin: "50% 50%",
            delay: 7,
            onComplete: ()=>{
                console.log('sdk')
            }
        })
        console.log('foo svg', dfs)
        console.log('foo svg', cts)
        */

        const socialIcons = document.querySelectorAll('.soc-li');

        socialIcons.forEach(icon => {
            // Ensure the cursor pointer style is active so users know it's clickable
            icon.style.cursor = 'pointer';

            icon.addEventListener('click', (e) => {
                // Prevent event bubbling if the icon sits inside a clickable card or link
                console.log(e)
                e.stopPropagation()
                // Retrieve the target URL from a data attribute on the wrapper, or fallback to a default
               
                const wrapper = icon.closest('a') || icon.closest('.icon-cont');
                const url = icon.getAttribute('data-link');

                if (url && url !== '#') {
                    window.open(url, 'portfolio_tab', 'noopener,noreferrer');
                } else {
                    console.warn('Social icon clicked, but no valid destination URL was found.');
                }
            });
        });


    }
    setCursor() {
        const cursor = document.querySelector('.custom-cursor');

        // Move cursor element to match mouse position
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Expand cursor when hovering over interactive elements
        document.querySelectorAll('a, button').forEach((el) => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });

    }


    setScrollE() {
        const scrollContainer = window;
        const erkElement = document.querySelector('.erk');

        // Set initial hidden state
        gsap.set(erkElement, { autoAlpha: 0, y: 20 });

        let scrollTimeout;
        let isVisible = false;

        scrollContainer.addEventListener('scroll', () => {
            // 1. Show the element immediately as soon as scrolling starts
            if (!isVisible) {
                isVisible = true;
                gsap.to(erkElement, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            }

            // 2. Clear the previous timeout
            clearTimeout(scrollTimeout);

            // 3. Hide the element after scrolling stops for 150ms
            scrollTimeout = setTimeout(() => {
                isVisible = false;
                gsap.to(erkElement, {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.5,
                    ease: 'power2.in',
                    overwrite: 'auto'
                });
            }, 150);
        });
    }


}
