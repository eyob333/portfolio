import * as THREE from 'three'
import Lenis from 'lenis'
import gsap from "gsap";

import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

import App from "../App";
import Ui from '../Ui/Ui';



export default class Animation {

    constructor() {
        this.app = new App();
        this.ui = new Ui();
        
        this.device = this.app.sizes.device;
        this.slide();

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
        this.setHomeScrol()

    }

    nav_hash() {

    }

    slide() {

        let slider = document.querySelector('.slider-hom');
        const cardsH = slider.querySelectorAll('.slide');

        let sliderTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: slider,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                snap: {
                    snapTo: 1 / (cardsH.length - 1), // Snaps relative to total panels, 
                    duration: { min: 0.15, max: 0.4 }, // Faster snap recovery
                    delay: 0.15,                       // Brief delay before snapping engages
                    ease: 'power1.inOut',
                    marker: false
                },
                invalidateOnRefresh: true,
                end: () => "+=" + (slider.scrollWidth - slider.clientWidth),
                }
        });

        sliderTl
            .to(slider, {
                x: () => -(slider.scrollWidth - slider.clientWidth),
            }, "<")
            .to('.slider-line', {
                scaleX: 1,
            }, "<");

        cardsH.forEach((card) => {
            const para = card.querySelector('.par-cont p');

            if (!para) return;

            gsap.set(para, { opacity: 0, y: 40 });

            gsap.to(para, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: sliderTl,
                    start: "left 85%",
                    end: "right 15%",
                    toggleActions: "play reverse play reverse",
                    //markers: true
                }
            });
        });




        let s1Elements = document.querySelectorAll('.section-container-div .slider');


        //console.log(`foo elek`,s1Elements)
        s1Elements.forEach((s1) => {

            //const proj = s1.classList.value.split(' ').at(-1) == 'projf';
            const proj = false;
            const k = s1.classList.value.split(' ').at(-1) == 'ks';



            const lockedE = s1.querySelector('.wo-am')
            

            const cards = gsap.utils.toArray(s1.querySelectorAll('.slider-cont'));
            const track = cards[0].parentElement;          // the element your x tween moves (.sliders)

            let snapPoints = [0];

            const getDistance = () => Math.max(1, s1.scrollWidth - s1.clientWidth);

            const computeSnaps = () => {
                const dist = getDistance();
                const trackLeft = track.getBoundingClientRect().left;
                snapPoints = cards.map((c) => {
                    const left = c.getBoundingClientRect().left - trackLeft;  
                    return gsap.utils.clamp(0, 1, left / dist);
                });
            };
            computeSnaps();

            


            const sliderT2 = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: s1,       // Tracks this specific element
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    end: () => '+=' + getDistance(),
                    onRefresh: computeSnaps,  
                    snap: {
                        snapTo: (progress) => gsap.utils.snap(snapPoints, progress), // Snaps relative to total panels, 
                        duration: { min: 0.15, max: 0.4 }, // Faster snap recovery
                        delay: 0.1,                       // Brief delay before snapping engages
                        ease: 'power1.inOut',
                        //markers: false
                        
                    },
     
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

            cards.forEach((card, i) => {
                
                /*                 
                if (proj) {

                    if( !this.device.mobile){

                        const desc = card.querySelectorAll('.s-name h2');
                        const vid = card.querySelector('.s-name h2');
                        const line = card.querySelector('.title-line');
                        const tit = card.querySelector(`.frac-cont h2`);

                        const descCont = card.querySelectorAll('.s-desc .icons, .s-desc .desc');
                        const vidCont = card.querySelector('.s-video');

                        const containerV = card.querySelector('.frac-wrap').offsetWidth;
                        const vidV = vidCont.querySelector('video').offsetWidth;
                        const vidContV = vidCont.getBoundingClientRect().width;

                        console.log( `cont-frac`, containerV, `\nvideo: `, vidV, `\nvideo-cont: `, vidContV);

                        
                        gsap.set(tit, { opacity: 0, yPercent: 100 });
                        gsap.set(line, {scaleX: 0});
                        gsap.set(descCont, { xPercent: -120, scaleY: .8, opacity: 0 });
                        gsap.set(vidCont, { x: ((containerV-vidContV ) / 2) - 70, yPercent: -30, scale: 1.2 }); 

                        cardTL.to(vidCont, { yPercent: 14, duration: .8}) 
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 15%)' }, `-=.5`)   
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 46%, 0 15%)' })  
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 51%)' }) 
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 83%, 0 51%)' })
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 81%, 0 100%)' }) 
                        cardTL.to(vidCont, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' })                     
                        cardTL.to(vidCont, { x: 0, duration: .4}) 
                        cardTL.to(vidCont, { scale: 1, duration: .4}) 
                        cardTL.to(line, { scaleX: 1, duration: .7 }, `-=.1`);    
                        cardTL.to(tit, { opacity: 1, yPercent: 0, duration: .8, ease: "power2.out"}, `-=.2`);

        
                        cardTL.to(descCont, { xPercent: 0, scaleY: 1, opacity: 1, stagger: .3, duration: .8, ease: "power2.out" });

                    }
                    else{

                        
                    }

                } 
                */
                 
                ///*
                if(k){
                    
                    
                    
                    const cardTL= gsap.timeline({
                        defaults: {
                            duration: .1,
                        },
                        scrollTrigger: {
                                trigger: card,
                                containerAnimation: sliderT2,
                                start: "left 85%",
                                end: "right 25%", 
                                toggleActions: "play reverse play reverse",
                                //markers: true
                            }
                    });

                    if (i == 0 || i == cards.length -1 ){
                       
                        const lineS = card.querySelector(`svg .line-s`);
                        const cirleInS = card.querySelector(`svg .circle-i`);
                        const cirleOuS = card.querySelector(`svg .circle-o`);
                        
                        //console.log(`console conjest`, lineS, cirleInS, cirleOuS);
                        gsap.set( cirleInS, {y: 0});
                        gsap.set( lineS, { scaleY: .04 });
                        gsap.set( cirleOuS, { scale: .0, transformOrigin: "center" });

                        cardTL.to(cirleInS, {y: 422, duration: 2});
                        cardTL.to(lineS, { scaleY: 1, duration: 2 }, "<");
                        cardTL.to(lineS, { drawSVG: false, duration: 1 }, "-=1.3");
                        cardTL.to(cirleOuS, {scale: 1, duration: .3 }, "-=.2");

                        return;
                        
                    }

                    //console.log(`coskdfj`, card)
                    const lineK = card.querySelector(`.s-line`);
                    const image = card.querySelector(`.s-image`);
                    const number = card.querySelector(`.s-index p`);
                    const titl = card.querySelector(`.s-name h2`);
                    const icon = card.querySelectorAll(`.s-icon .icon-cont`);


                    console.log(`fook`, lineK)
                   
                    gsap.set(lineK, {scaleX:0, transformOrigin: `left`});
                    gsap.set(titl, { opacity: 0, yPercent: -30 });
                    gsap.set(image, { opacity: 0, yPercent: 100 });
                    gsap.set(icon, { yPercent: 100, scaleX: .4});
                    gsap.set(number, { opacity: 0, yPercent: -30 });

                    cardTL.to(image, {opacity:1, yPercent: 0, duration: .4})
                    cardTL.to(lineK, { scaleX: 1, duration: .8, ease: "power2.out" });
                    cardTL.to(icon, { yPercent: 0, scaleX: 1, stagger: .07, duration: .3 });
   
                    cardTL.to(titl, { opacity: 1, yPercent: 0, duration: .4, ease: "power2.out" }, "<");
                    cardTL.to(number, { opacity: 1, yPercent: 0, duration: .4, ease: "power2.out" }, "<");
                    cardTL.to( titl, {  duration: 2, scrambleText:{ text: titl.innerText, chars: "10", speed: .01 }})       


                }
               //*/

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

        let pk = this.device.mobile ? 35 : 50;
        let pi = this.device.mobile ? 25 : 30;


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
            if (!this.device.mobile) {
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
        if (!this.device.mobile) {
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
                scrollTo: { autoKill: true, y: `#${target}` },
                duration: 1.4,
                ease: "back.out(1)"

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


    setEvent() {
        /* window.addEventListener('scroll', () => {

            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                
            }, 250);
      }) */

        
        /* 
        const pts = gsap.utils.toArray('.wo-spacer svg')
        console.log(pts)
        
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


    }


    setScrollE() {
        const scrollContainer = window;
        const erkElement = document.querySelector('.erk');
        
        // Set initial hidden state
        gsap.set(erkElement, { autoAlpha: 0, y: 20 });

        let scrollTimeout;
        let isVisible = false;

        scrollContainer.addEventListener('scroll', () => {
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

            clearTimeout(scrollTimeout);

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

    setHomeScrol(){
        //home-introHeader,
        const homeSec = document.querySelector('#home .page-home');

        let homTl = gsap.timeline({
            defaults: {
                ease: 'none'
            },
            scrollTrigger: {
                trigger: homeSec,
                toggleActions: "play reverse play reverse",
                start: "center center",
                end: "bottom 70%",
                invalidateOnRefresh: true,
                //markers: true,
                }
        });
        const mainHead = homeSec.querySelector(`.heading-cont h1`);
        const mainHeSplit = SplitText.create( mainHead, { type: "words, chars" });

        gsap.set( homeSec.querySelector(`.subhead-cont h4`), {opacity: 0})
        gsap.set( mainHead, {yPercent: 100});
        gsap.set( mainHeSplit.words, {opacity: 0 });
       
        homTl.to( mainHeSplit.words, {yPercent: -100, opacity: 1, stagger: .3, duration: .3})
        
        homTl.to( homeSec.querySelectorAll(`.subhead-cont h4`), {yPercent: -100, opacity: 1, duration: 1})


        //page-introHeader,
        const pageSec = gsap.utils.toArray('.intro-header');

        pageSec.forEach( introH => {
            const pageHe = introH.querySelector('.title-cont h1');
            const pagePa = introH.querySelector('.title-cont p');

            const pageHeSp = SplitText.create( pageHe, { type: "chars" });
            const pagPaSp = SplitText.create( pagePa, { type: "words, chars" });
            

            gsap.set( pageHeSp.chars, {yPercent:100, opacity: 0})
            gsap.set( pagePa, {opacity:0})

            const pageTl = gsap.timeline({
                defaults: {
                    ease: 'none'
                },
                scrollTrigger: {
                    trigger: introH,
                    invalidateOnRefresh: true,
                    toggleActions: "play reverse play reverse",
                    start: "20% center",
                    end: "bottom 70%",
                    //markers: true,
                    
                    }
            });    
            pageTl.to( pageHeSp.chars, { yPercent: 0, opacity: 1, duration: .3, stagger: .04 });
  

            

        });


        //constact-timeL,
        const contacSe = document.querySelector('#contact .contacts');

        let contTl = gsap.timeline({
            defaults: {
               ease: `power4.inOut`
            },
            scrollTrigger: {
                trigger: contacSe,
                toggleActions: "play reverse play reverse",
                start: "bottom 80%", 
                end: "top 20%", 
                //markers: true
                }
        });

        contTl.set(contacSe.querySelectorAll('.submit-wrapper button'), { yPercent: -200, opacity:0, transformOrigin: `top` })
        contTl.set(contacSe.querySelectorAll('.swq .socials .icons'), { yPercent: -110, opacity:0,  transformOrigin: `top`, skewY: 10 })    
        contTl.set( contacSe.querySelectorAll('.form-field label'), { x: -10 })

        contTl.to( contacSe, { scaleY: 1, duration: .6 })           
        contTl.to( contacSe.querySelectorAll('.input-border-wrap, .subject-border-wrap'), { scaleX: 1, stagger: .1, duration: 1 }, `-=.5`)
        contTl.to( contacSe.querySelectorAll('.submit-wrapper button'), { yPercent: -100, duration: .4, opacity: 1 }, `-=.4`)
        contTl.to( contacSe.querySelector('.swq p.sp'), { duration: .2, opacity: 1 },  `-=.3`)
        contTl.to( contacSe.querySelectorAll('.swq .socials .icons'), { yPercent: 0, stagger: .07 , duration: .4, opacity: 1, skewY: 0 },  `-=.4`)
        contTl.to( contacSe.querySelector('h1.form-title'), { duration: .3, opacity: 1 },  `-=.6`)
        contTl.to( contacSe.querySelectorAll('.form-field label'), { duration: .3, opacity: 1, xPercent: 0, stagger: .07 }, `-=.3`)
        contTl.to( contacSe.querySelectorAll('input, textarea'), { duration: .3, color: '#ffffff' }, `-=.2`)

    }


} 
