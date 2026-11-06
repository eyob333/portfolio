import * as THREE from 'three'
import gsap from "gsap";
import Draggable from 'gsap/Draggable';
import Lenis from 'lenis';

import App from '../App';

import { trackXHover } from './Helper';

import Nav from '../Ui/Nav';

export default class Event {
	constructor() {
		this.app = new App();
		this.device = this.app.sizes.device
		

		if (!this.device.mobile || this.device.tab){
			console.log(this.device)
			this.setCursor();		
	
		}
		this.setOnStart();
		this.setEvents();
		this.setReDirect();
		this.setTheme();


	}



	setCursor() {
		//mouse move
		const cursor = document.querySelector('.custom-cursor');
		const cur_poi = document.querySelector('.custom-cursor .cursor-poi')
		const cur_bor = document.querySelector('.custom-cursor .cursor-bor')


		const xPoi = gsap.quickTo(cur_poi, 'x', { duration: 0.01, ease: 'power3' });
		const yPoi = gsap.quickTo(cur_poi, 'y', { duration: 0.01, ease: 'power3' });

		const xBor = gsap.quickTo(cur_bor, 'x', { duration: 0.3, ease: 'power2.out' });
		const yBor = gsap.quickTo(cur_bor, 'y', { duration: 0.3, ease: 'power2.out' });

		window.addEventListener('mousemove', (e) => {
			gsap.set(cursor, {
				visibility: 'visible'
			})

			xPoi(e.clientX);
			yPoi(e.clientY);

			xBor(e.clientX);
			yBor(e.clientY);
		});

		// Expand cursor when hovering over interactive elements
		document.querySelectorAll('a, button').forEach((el) => {
			el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
			el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
		});


		//mouse leave
		document.body.addEventListener('mouseleave', (e) => {
			console.log('Mouse left the screen/viewport!');
			gsap.set(cursor, { visibility: 'hidden' });

		});

	}


	setTheme() {
		//theme change
		let device = this.app.sizes.device;
		let element = document.querySelector(".util .theme .icons-t")
		let te = document.querySelector('.transition-overlay')

		function snapElementToTarget(elementToMove, targetElement) {
			const targetRect = targetElement.getBoundingClientRect();
			gsap.set(elementToMove, {
				position: 'fixed',
				top: targetRect.top,
				left: targetRect.left,
				width: targetRect.width,
				height: targetRect.height,
				margin: 0,
				zIndex: 9
			});
		}


		gsap.set('.transition-overlay', {
			clipPath: `circle(0% at  50% 50%)`,
			transformOrigin: 'center'
		});

		element.addEventListener('click', (e) => {
			console.log("yo")
			console.log(element)
			snapElementToTarget(te, element)

			gsap.to('.transition-overlay', {
				clipPath: `circle(50% at 50% 50%)`,
				duration: 2.2,
				ease: 'power2.inOut',
				scale: 53,
				duration: 2.2,
				onStart: ()=>{
					gsap.set('.transition-overlay', {autoAlpha:1
					})
				},
				onComplete: () => {
					gsap.to('.transition-overlay', {
						clipPath: `circle(0% at  50% 50%)`,
						scale: 1,
						duration: 2,
						onComplete: ()=>{
							gsap.set('.transition-overlay', {autoAlpha: 0})
						},
						
					});

				}

			});

			gsap.to(element, {
				rotate: '+=180deg',

			})

		})

	}

	setReDirect() {
		// link redirect
		const socialIcons = document.querySelectorAll('.soc-li');

		socialIcons.forEach(icon => {
			icon.style.cursor = 'pointer';

			icon.addEventListener('click', (e) => {
				console.log(e)
				e.stopPropagation()
				const url = icon.getAttribute('data-link');
				if (url && url !== '#') {
					window.open(url, 'portfolio_tab', 'noopener,noreferrer');
				} else {
					console.warn('Social icon clicked, but no valid destination URL was found.');
				}
			});
		});
	}

	setEvents() {
		// main logo goto
		const homC = document.querySelector('#nav .main-icon .icon-mask')
		
		homC.addEventListener('click', () => {
			gsap.to(window, { scrollTo: `#home`, duration: 1.2, ease: "back.out(1)", overwrite: true })
			
		})

	
		const nav = document.querySelector(`#nav .nav`)
		const list = nav.querySelector('.nav-item');
		const items = gsap.utils.toArray('.nav .nav-mask');

		let points = [];   // list y-positions that put each item at the centre of .nav

		function measure() {
		const navH = nav.clientHeight;
		const listTop = list.getBoundingClientRect().top;
		const y = gsap.getProperty(list, 'y');

		points = items.map((item) => {
			const r = item.getBoundingClientRect();
			// item centre measured from the list's own top, so the current translation cancels out
			const centreInList = r.top - listTop + r.height / 2;
			return navH / 2 - centreInList;
		});
		return y;
		}

		measure();
		gsap.set(list, { y: points[0] });          // start with the first item centred

		const [drag] = Draggable.create(list, {
			type: 'y',
			inertia: true,
			bounds: { minY: Math.min(...points), maxY: Math.max(...points) },
			snap: {
				y: (value) => gsap.utils.snap(points, value),   // nearest centred position
			},
		onThrowComplete() {
			const i = points.reduce(
			(best, p, idx) => (Math.abs(p - this.y) < Math.abs(points[best] - this.y) ? idx : best), 0);
			console.log('centred item:', i);
		},
		});

		// re-measure after fonts/images load or on width changes
		function remeasure() {
		const i = points.reduce(
			(best, p, idx) => (Math.abs(p - gsap.getProperty(list, 'y')) < Math.abs(points[best] - gsap.getProperty(list, 'y')) ? idx : best), 0);
		measure();
		drag.applyBounds({ minY: Math.min(...points), maxY: Math.max(...points) });
		gsap.set(list, { y: points[i] });
		}
		let lastW = innerWidth;
		addEventListener('resize', () => { if (innerWidth !== lastW) { lastW = innerWidth; remeasure(); } });


		//sdf

		const navK = document.querySelectorAll('#nav .util .icons');

		const STOP_DELAY = 500; // longer than your snap pauses

		let stopTimer, idleCall;
		let scrolling = false;

		this.app.lenis.on("scroll", ({ velocity }) => {
		clearTimeout(stopTimer);
		idleCall?.kill();

		if (!scrolling) {
			scrolling = true;
			gsap.to(navK, { yPercent: -200, duration: 0.8, ease: "power2.out", overwrite: true });
		}

		stopTimer = setTimeout(() => {
			scrolling = false;
			gsap.to(navK, { yPercent: 0, duration: 0.4, ease: "power2.out", overwrite: true });
			idleCall = gsap.delayedCall(3, () =>
				gsap.to(navK, { yPercent: -200, delay: 1.7, duration: 0.6, ease: "power2.out", stagger: .07, overwrite: true })
			);
		}, STOP_DELAY);
		});


	}


	setOnStart(){
		// main logo
		let element = document.querySelector('.main-icon svg');
		gsap.to(element, { y: 21, })

		// nav goto
		const nav_y = this.device.mobile ?  11.2 : 21;
	
		let title_c = gsap.utils.toArray('.nav-mask .title-cont')
		gsap.set(title_c, { scale: 0 })

		let icos = gsap.utils.toArray('.nav-mask .svg-cont svg')
		gsap.set(icos, { y: nav_y,})

	}

	setImages(){
		
		const targetElement = document.querySelector('.slider-mod .side-m');
		//console.log(`foo slide m`, targetElement)

		trackXHover(targetElement, (normalizedX) => {
			// Triggers ONLY when hovering inside .my-card
			let i = targetElement.querySelector(`img`)
			i.src = `/images/${normalizedX+1}.webp`;
			console.log("Accurate Normalized X:", normalizedX); 
			
			// Example: Control GSAP animation progress based on mouse hover position
			// myGsapTimeline.progress(normalizedX);
		}, () =>{ console.log(`just exited`) });
	}


}