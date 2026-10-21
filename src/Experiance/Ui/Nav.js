import '../Styles/Nav.css'
import ContactIcons from "../../assets/contactIcons";
import navIcon from "../../assets/navIcon";
import { theme } from '../../assets/config';
import gsap from 'gsap';


export default class Nav{
    constructor(root, ui){
        this.container = root
        this.setInstance();

        if(ui){
            this.debug = ui.addFolder('nav')
                    .close();
            this.setDebug()
        }
    }

    setInstance(){
        let element = document.createElement('div');
        element.id = 'nav';
        element.classList.add('stick');
        element.innerHTML = `
            <div class="main-icon"> 
                    <div class="icon-mask">
                        <svg width="211" height="74" viewBox="0 0 211 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M207 70.5368L143 8.5C141.079 6.57913 138.474 5.5 135.757 5.5H120V66.5" stroke="white" stroke-width="9"/>
                        <path d="M88 66.5V4.50002H69.9031C68.9948 4.50002 68.1136 4.80914 67.4043 5.37654L63.5 8.50002L6.225 66.5H4.5V0" stroke="white" stroke-width="9"/>
                        </svg>


                    </div>
            </div>

            <div class="util"> 
                <div class="social">
                </div>
                <div class="theme">
                    <div class="icons icons-t">
                       <svg width="255" height="255" viewBox="0 0 255 255" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M131 0.0471115C199.798 1.90131 255 58.2541 255 127.5C255 196.746 199.798 253.099 131 254.953L131 0.0471115Z" fill="#2B323F"/>
                        <path d="M124 0V254.906C55.2018 253.052 0 196.699 0 127.453C0 58.207 55.2018 1.85419 124 0Z" fill="#F3F0E7"/>
                        </svg>

                    </div>
                </div>

            </div>

            <div class="nav">
                <div class="nav-item">
            
                </div>
            </div>
        `;
        this.container.appendChild(element);

        let navI = document.querySelector('.nav-item')
        let navInject = navIcon.map( d =>`
            <div class="nav-mask ${d.text}-nav-to">
                <div class="svg-cont"> 
                    ${d.icon}
                 </div>
                <div class="title-cont">
                     <p>${d.text}</p>
                </div>
            </div>
            `).join('')
        navI.innerHTML = navInject;

        let socialI = document.querySelector('.social')
        let injectSocial = ContactIcons.map( d =>`
            <div class="icons icons-s soc-li ${d.name}" data-link="${d.link}">
                ${d.icon}
            </div>
            `).join('')
        socialI.innerHTML = injectSocial;
    }

    setDebug() {
        let mainI = document.querySelector('#nav .main-icon')

        this.debug.add(theme, 'mainIcPosX').name('main-pos-x').min(-10).max(20).step(.1).onChange( ()=>{ gsap.set(mainI, {x: theme.mainIcPosX}) })
        this.debug.add(theme, 'mainIcPosY').name('main-pos-y').min(-30).max(30).step(.1).onChange( ()=>{ gsap.set(mainI, {y: theme.mainIcPosY}) })
        this.debug.add(theme, 'mainScale').name('main-pos-y').min(0).max(10).step(.01).onChange( ()=>{ gsap.set(mainI, {scale: theme.mainScale}) })


        const navU = document.querySelector('#nav .util')

        this.debug.add(theme, 'utilPosX').name('util-pos-x').min(-10).max(20).step(.1).onChange( ()=>{ gsap.set(navU, {x: theme.utilPosX}) })
        this.debug.add(theme, 'utilPosY').name('util-pos-y').min(-30).max(30).step(.1).onChange( ()=>{ gsap.set(navU, {y: theme.utilPosY}) })


        const navN = document.querySelector('#nav .nav')
        
        this.debug.add(theme, 'navPosX').name('nav-pos-x').min(-30).max(20).step(.1).onChange( ()=>{ gsap.set(navN, {x: theme.navPosX}) })
        this.debug.add(theme, 'navPosY').name('nav-pos-y').min(-40).max(40).step(.1).onChange( ()=>{ gsap.set(navN, {y: theme.navPosY}) })
        this.debug.add(theme, 'navFade').name('nav-fade').min(0).max(80).step(.01).onChange( ()=>{ gsap.set(navN, {'--fade': theme.navFade}) })

        const navI = navN.querySelector('.nav-item')

        this.debug.add(theme, 'navIcPosX').name('n-Item-pos-x').min(-30).max(20).step(.1).onChange( ()=>{ gsap.set(navI, {x: theme.navIcPosX}) })
        this.debug.add(theme, 'navIcPosY').name('n-Item-pos-y').min(-40).max(40).step(.1).onChange( ()=>{ gsap.set(navI, {y: theme.navIcPosY}) })
        
        const navS = navN.querySelectorAll('svg')
        
        this.debug.add(theme, 'navSvgPosX').name('n-svg-pos-x').min(-30).max(30).step(.1).onChange( ()=>{ gsap.set(navS, {x: theme.navSvgPosX}) })
        this.debug.add(theme, 'navSvgPosY').name('n-svg-pos-y').min(-40).max(40).step(.01).onChange( ()=>{ gsap.set(navS, {y: theme.navSvgPosY}) })


    }
}