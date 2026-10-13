import '../Styles/Home.css'
import icons from "../../assets/techStackIcons";
import { theme } from '../../assets/config';
import { addDebugC } from '../Utils/Helper';
import gsap from 'gsap';

export default class Home{

    constructor(root, ui){
        this.container = root
        this.setInstance();
        if(ui){
            this.debug = ui.addFolder('home')
            this.setDebug()
                                //.close();
        }

    }

    setInstance(){
        this.element = document.createElement('section');
        this.element.id = 'home';
        this.element.classList.add('page');
        this.element.innerHTML = `
            <div class="page-home sec">
                <div class="text-cont"> 
                    <div class="heading-cont" >
                        <h1>winter nomad</h1>
                    </div>

                    <div class="subhead-cont">
                        <div class="mask">
                            <h4 class="primary">Software Engnieer</h4>
                            <h4 class="secondary">Fullstack Developer</h4>
                            <h4 class="teritiary">Shader Artist</h4> 
                            <h4 class="fourth">Createive Developer</h4>
                        </div>
                    </div>
                 </div> 
            </div>


            <div class="slide-wrapper">    
                <div class="slider-hom sec"> 
                    <div class="slide-hom">
                        <div class="slide abt a1" >

                            <span class="empty"> </span>

                            <div class="detail-cont">
                                <div class="par-cont"> 
                                    <p>
                                        Hi, <strong>Winter-Nomad</strong>, a software engineer, web developer and musician based in Ethiopia.
                                        <br>
                                        <br>
                                        I specialize in JavaScript, Python, C/C++, GLSL, Java and Go, and build scalable web apps using React, Three.js, Vite, and Express. 
                                        My work spans responsive sites, real-time 3D, backend systems, and low-level software.
                                        <br>
                                    </p>
                                </div>
                            </div>
                        </div> 

                        <div class="slide abt a2">
                            <div class="detail-cont">
                                <div class="par-cont"> 
                                    <p>
                                        <br>
                                        Currently, I'm deepening my understanding of databases—focusing on data modeling, performance, and architecture. 
                                        I love solving complex problems and turning ideas into efficient, high-impact solutions.
                                        <br> 
                                        <br> 
                                        Outside of coding, 
                                        I play lead guitar, participate in Jam sessions and contribute to innovative projects.
                                        <br>
                                        <strong>“Make it work, make it right, make it fast.” – Kent Beck</strong>
                                    </p> 
                                </div>
                            </div>
                            <span class="empty"> </span>
                        </div>
                        <div class="slide tech"> 
                            <div class="title-cont"> 
                                <h2>Techstack</h2>
                                <div class="sub-h-cont">                            
                                    <p>Major languages, frameworks and tools i've worked with </p> 
                                </div>

                            </div>
                            <div class="icon-cont"> 
                            </div>
                        </div>   
                    </div>
                    <div class="slider-line"> </div>
                </div>
            </div>



        `;

        this.container.appendChild(this.element);

        let techE =document.querySelector('.icon-cont');
        techE.innerHTML = icons.map(icon => `
          <div class="icon tech-i">
            <div class="svg-cont">
                ${icon.svg}
            </div>
            <div class="icon-name">
                <p>${icon.name}</p>
            </div>
          </div>
        `).join('')
    }


    setDebug(){
        // title section
        let hh = this.debug.addFolder('heading')

        const maiHe = this.element.querySelector('.text-cont .heading-cont');
        const subHe = this.element.querySelector('.text-cont .subhead-cont')

    
        hh.add(theme, 'homeHeadPosX').name('main-head-x').min(-50).max(300).step(.1).onChange( () =>{gsap.set(maiHe, { x: theme.homeHeadPosX})} );
        hh.add(theme, 'homeHeadPosY').name('main-head-y').min(-50).max(300).step(.1).onChange( () =>{gsap.set(maiHe, { y: theme.homeHeadPosY})} );
        
        hh.add(theme, 'mainFontSize').name('main-size').min(.4).max(15).step(.01).onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontSize: theme.mainFontSize})} );
        hh.add(theme, 'mainFontWeight').name('main-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontWeight: theme.mainFontWeight})} );
        hh.add(theme, 'mainFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('main-font-family').onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontFamily: theme.mainFontFam })} );    


        hh.add(theme, 'homeSubHePosX').name('sub-head-x').min(-50).max(300).step(.1).onChange( () =>{gsap.set(subHe, { x: theme.homeSubHePosX})} );
        hh.add(theme, 'homeSubHePosY').name('sub-head-y').min(-50).max(300).step(.1).onChange( () =>{gsap.set(subHe, { y: theme.homeSubHePosY})} );
        
        hh.add(theme, 'HsubFontSize').name('sub-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set(maiHe.querySelector(`h4`), { fontSize: theme.HsubFontSize + 'rem'})} );
        hh.add(theme, 'HsubFontWeight').name('sub-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(maiHe.querySelector(`h4`), { fontWeight: theme.HsubFontWeight})} );

        hh.add(theme, 'HsubFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('sub-font-family').onChange( () =>{gsap.set(maiHe.querySelector(`h4`), { fontFamily: theme.HsubFontFam })} );  

        //slider section  
        let hs = this.debug.addFolder('slider')

        const techHead = this.element.querySelector('.slide-wrapper .tech .title-cont');
        const techSubHead = this.element.querySelector('.slide-wrapper .tech .title-cont');
        const techIcon = this.element.querySelector('.slide-wrapper .tech .icon-cont')

        const slideOnePara = this.element.querySelector('.slide-wrapper .tech .title-cont');
        const slideTwoPara = this.element.querySelector('.slide-wrapper .tech .title-cont');

        hs.add(theme, 'homeHeadPosY').name('sub-head-y').min(-50).max(300).step(.1).onChange( () =>{gsap.set(subhe, { y: theme.homeHeadPosY})} );

    }

         
}