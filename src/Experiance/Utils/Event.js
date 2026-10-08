import * as THREE from 'three'
import gsap from "gsap";
import App from '../App';

export default class Event {
	constructor() {
		this.app = new App();

		this.setCursor();
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
			gsap.set(cursor, {
				visibility: 'hidden',
			});

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
				zIndex: 9999
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
				onComplete: () => {
					gsap.to('.transition-overlay', {
						clipPath: `circle(0% at  50% 50%)`,
						scale: 1,
						duration: 2
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
		let element = document.querySelector('.main-icon svg');
		const homC = document.querySelector('#nav .main-icon .icon-mask')
		homC.addEventListener('click', () => {
			gsap.to(window, {
				scrollTo: `#home`,
				duration: 1.8,
				ease: "back.out(1)"

			})

		})

		gsap.to(element, {
			y: 22
		})

		let title_c = gsap.utils.toArray('.nav-mask .title-cont')
		title_c.forEach(e => {
			gsap.to(e, {
				scale: 0,
			})

		});
		let icos = gsap.utils.toArray('.nav-mask .svg-cont svg')
		icos.forEach(element => {
			gsap.to(element, {
				y: '21px',
			})
		});


		
	}




}