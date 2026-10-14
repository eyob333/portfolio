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
                                        .close();
            this.setDebug()
                               
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
                                    .close();
        const maiHe = this.element.querySelector('.text-cont .heading-cont');
        const subHe = this.element.querySelector('.text-cont .subhead-cont')

    
        hh.add(theme, 'homeHeadPosX').name('main-head-x').min(-50).max(300).step(.1).onChange( () =>{gsap.set(maiHe, { x: theme.homeHeadPosX})} );
        hh.add(theme, 'homeHeadPosY').name('main-head-y').min(-50).max(300).step(.1).onChange( () =>{gsap.set(maiHe, { y: theme.homeHeadPosY})} );
        
        hh.add(theme, 'mainFontSize').name('main-size').min(.4).max(15).step(.01).onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontSize: `${theme.mainFontSize}rem`})} );
        hh.add(theme, 'mainFontWeight').name('main-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontWeight: theme.mainFontWeight})} );
        hh.add(theme, 'mainFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('main-font-family').onChange( () =>{gsap.set(maiHe.querySelector(`h1`), { fontFamily: theme.mainFontFam })} );    


        hh.add(theme, 'homeSubHePosX').name('sub-head-x').min(-50).max(300).step(.1).onChange( () =>{gsap.set(subHe, { x: theme.homeSubHePosX})} );
        hh.add(theme, 'homeSubHePosY').name('sub-head-y').min(-50).max(300).step(.1).onChange( () =>{gsap.set(subHe, { y: theme.homeSubHePosY})} );
        
        hh.add(theme, 'HsubFontSize').name('sub-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set(subHe.querySelector(`h4`), { fontSize: `${theme.HsubFontSize}rem`})} );
        hh.add(theme, 'HsubFontWeight').name('sub-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(subHe.querySelector(`h4`), { fontWeight: theme.HsubFontWeight})} );

        hh.add(theme, 'HsubFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('sub-font-family').onChange( () =>{gsap.set(subHe.querySelector(`h4`), { fontFamily: theme.HsubFontFam })} );  

        //slider section  
        let hs = this.debug.addFolder('slider')
                                    .close();
        const techHead = this.element.querySelector('.slide-wrapper .tech .title-cont h2');
        const techSubHead = this.element.querySelector('.slide-wrapper .tech .title-cont p');
        const techIcon = this.element.querySelectorAll('.slide-wrapper .tech .icon-cont .svg-cont')
        const techIcPara = this.element.querySelectorAll('.slide-wrapper .tech .icon-cont .icon-name')

        const slidePara = this.element.querySelectorAll('.slide.abt p');

        hs.add(theme, 'HslideParaFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('slide-font-family').onChange( () =>{gsap.set(slidePara, { fontFamily: theme.HslideParaFontFam })} ); 
        hs.add(theme, 'HslideParaFontWeig').name('slide-para-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(slidePara, { fontWeight: theme.HslideParaFontWeig})} );
        hs.add(theme, 'HslideParaFontSize').name('slide-font-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set(slidePara, { fontSize: `${theme.HslideParaFontSize}rem`})} );


        hs.add(theme, 'HtechHeadFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('tech-head-font-family').onChange( () =>{gsap.set(techHead, { fontFamily: theme.HtechHeadFontFam })} ); 
        hs.add(theme, 'HtechHeadFontSize').name('tech-head-font-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( techHead, { fontSize: `${theme.HtechHeadFontSize}rem`})} );
        hs.add(theme, 'HtechHeadFontWeig').name('tech-head-para-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( techHead, { fontWeight: theme.HtechHeadFontWeig})} );
        hs.add(theme, 'HtechHeadPosX').name('tech-head-para-posX').min(-10).max(30).step(.01).onChange( () =>{gsap.set( techHead, { x: theme.HtechHeadPosX})} );
        hs.add(theme, 'HtechHeadPosY').name('tech-head-para-posY').min(-10).max(30).step(.01).onChange( () =>{gsap.set( techHead, { y: theme.HtechHeadPosY})} );

        hs.add(theme, 'HtechSubhFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('tech-subh-font-family').onChange( () =>{gsap.set(techSubHead, { fontFamily: theme.HtechSubhFontFam })} ); 
        hs.add(theme, 'HtechSubhFontSize').name('tech-subh-font-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set(techSubHead, { fontSize: `${theme.HtechSubhFontSize}rem`})} );
        hs.add(theme, 'HtechSubHFontWeig').name('tech-subh-para-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(techSubHead, { fontWeight: theme.HtechSubHFontWeig})} );
        hs.add(theme, 'HtechSubhPosX').name('tech-subh-para-posX').min(-10).max(30).step(.01).onChange( () =>{gsap.set( techSubHead, { x: theme.HtechSubhPosX})} );
        hs.add(theme, 'HtechSubhPosY').name('tech-subh-para-posY').min(-10).max(30).step(.01).onChange( () =>{gsap.set( techSubHead, { y: theme.HtechSubhPosY})} );


        hs.add(theme, 'HtechIconWidth').name('icon-width').min(1).max(50).step(.1).onChange( () =>{gsap.set(techIcon, { width: theme.HtechIconWidth})} );
        hs.add(theme, 'HtechIconHeight').name('icon-height').min(1).max(50).step(.1).onChange( () =>{gsap.set(techIcon, { height: theme.HtechIconHeight})} );

        hs.add(theme, 'HtechIconTextSize').name('icon-text-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set(techIcPara, { fontSize: `${theme.HtechIconTextSize}rem`})} );
        hs.add(theme, 'HtechIconTextWeig').name('icon-text-weight').min(100).max(900).step(100).onChange( () =>{gsap.set(techIcPara, { fontWeight: theme.HtechIconTextWeig})} );

    }

         
}