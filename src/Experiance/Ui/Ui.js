import gsap from "gsap";
import App from "../App";
import Event from "../Utils/Event";

import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";
import Models from "./Models";
import Underlay from "./Underlay";
import { theme } from "../../assets/config";



export default class Ui{
    constructor(){
        this.app = new App()
        
        this.resouces = this.app.resources
        this.ui = null
        this.device = this.app.sizes.device
        this.themeObj = {}

        this.container = document.querySelector("div.section-container-div");
        this.underlay = document.querySelector("div.underlay-container-div")

        if(this.app.debug.active){
            this.ui = this.app.debug.ui.addFolder("Ui")
        }

        this.nav = new Nav(this.container, this.ui)
        this.home = new Home(this.container, this.ui);
        this.project = new Project(this.container, this.ui, this.device, this.resouces);        
        this.models = new Models(this.container, this.ui, this.device, this.resouces)
        this.labs = new Labs(this.container, this.ui, this.device, this.resouces);
        this.contact = new Contact(this.container, this.ui)

        let k = this.device.mobile ? 0 : 2;


        this.cCout = {
            p: this.project.cardCount(), 
            l: this.labs.cardCount().slice(0, -k),
            m: this.models.cardCount().slice(0, -k),
        }

        this.homeUnderlay = new Underlay(this.underlay, this.ui, this.cCout);

        if(this.app.debug.active){
                        this.setDebug()
        }

        this.event = new Event();
        this.setReqEvent();

    }




    setDebug(){

        //theme        
        const df = this.ui.addFolder("theme")
                                    .close();
  
        const el = document.querySelector(`.underlay-container-div`)
        const nav = document.querySelector(`.underlay-container-div`)
        const icon = document.querySelector(`.underlay-container-div`)
        const mainTex = document.querySelector(`.underlay-container-div`) 
        const prefTex = document.querySelector(`.underlay-container-div`) 

        df.addColor(theme, 'bgColor').name('background-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.bgColor})});
        df.addColor(theme, 'iconColor').name('icon-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.iconColor})});
        df.addColor(theme, 'navColor').name('nav-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.navColor})});
        df.addColor(theme, 'scoColor').name('scr-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.scoColor})});
        df.addColor(theme, 'socialIcColor').name('social-icon-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.socialIcColor})});
        df.addColor(theme, 'mainTexColor').name('main-tex-c').onChange( () =>{gsap.set(mainTex, {color: theme.mainTexColor})});
        df.addColor(theme, 'prefTexColor').name('pref-tex-c').onChange( () =>{gsap.set(prefTex, {color: theme.prefTexColor})});


       //pref_logs
        const pf = this.ui.addFolder("pref-Pos")
                                     .close(); 
 
        const lg = document.querySelector('.lil-gui')
        const sg = document.querySelector('.stat-dom-k')     
        pf.add(theme, 'lilGuiX').name('lil-gui-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(lg, {x: theme.lilGuiX})});
        pf.add(theme, 'lilGuiY').name('lil-gui-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(lg, {y: theme.lilGuiY})});
        pf.add(theme, 'scaleGui').name('lil-gui-scale').min(0).max(5).step(.01).onChange( () =>{gsap.set(lg, {y: theme.scaleGui})});

        pf.add(theme, 'statX').name('stats-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(sg, {x: theme.statX})});
        pf.add(theme, 'statY').name('stats-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {y: theme.statY})});

        //commons
        //heading
        const cf = this.ui.addFolder('commons')
                                    .close(); 

       const headCont = document.querySelectorAll('section.page .intro-header h1');
       const subHeCont = document.querySelectorAll('section.page .intro-header p');

           
       cf.add(theme, 'pageHeadFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('page-head-family').onChange( () =>{gsap.set(headCont, { fontFamily: theme.pageHeadFontFam })} ); 
       cf.add(theme, 'pageHeadFontSize').name('page-head-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( headCont, { fontSize: `${theme.pageHeadFontSize}rem`})} );
       cf.add(theme, 'pageHeadFontWeig').name('page-head-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( headCont, { fontWeight: theme.pageHeadFontWeig})} );
       cf.add(theme, 'pageHeadPosX').name('page-head-x').min(-500).max(500).step(.1).onChange( () =>{gsap.set( headCont, {x: theme.pageHeadPosX})});
       cf.add(theme, 'pageHeadPosY').name('page-head-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set( headCont, {y: theme.pageHeadPosY})});

       cf.add(theme, 'pageSubhFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('page-Subh-family').onChange( () =>{gsap.set(subHeCont, { fontFamily: theme.pageSubhFontFam })} ); 
       cf.add(theme, 'pageSubhFontSize').name('page-Subh-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( subHeCont, { fontSize: `${theme.pageSubhFontSize}rem`})} );
       cf.add(theme, 'pageSubhFontWeig').name('page-Subh-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( subHeCont, { fontWeight: theme.pageSubhFontWeig})} );
       cf.add(theme, 'pageSubhPosX').name('page-Subh-x').min(-500).max(500).step(.1).onChange( () =>{gsap.set(subHeCont, {x: theme.pageSubhPosX})});
       cf.add(theme, 'pageSubhPosY').name('page-Subh-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(subHeCont, {y: theme.pageSubhPosY})});



       //slide
       const sliNum = document.querySelectorAll('.slide-wrapper .sliders .s-index p');
       const sliTitle = document.querySelectorAll('.slide-wrapper .sliders .s-name h2');
       const sliC = document.querySelectorAll('.wo-am svg');
       

       cf.add(theme, 'pageSlideTitFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('slide-tit-family').onChange( () =>{gsap.set(sliTitle, { fontFamily: theme.pageSlideTitFontFam })} ); 
       cf.add(theme, 'pageSlideTitFontSize').name('slide-tit-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( sliTitle, { fontSize: `${theme.pageSlideTitFontSize}rem`})} );
       cf.add(theme, 'pageSlideTitFontWeig').name('slide-tit-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( sliTitle, { fontWeight: theme.pageSlideTitFontWeig})} );

       cf.add(theme, 'pageSlideNumFontFam', ['NextSphere', 'NextSphereLight', 'NextSphereExtraLight',]).name('slide-num-family').onChange( () =>{gsap.set(sliNum, { fontFamily: theme.pageSlideNumFontFam })} ); 
       cf.add(theme, 'pageSlideNumFontSize').name('slide-num-size').min(0.5).max(12).step(.01).onChange( () =>{gsap.set( sliNum, { fontSize: `${theme.pageSlideNumFontSize}rem`})} );
       cf.add(theme, 'pageSlideNumFontWeig').name('slide-num-weight').min(100).max(900).step(100).onChange( () =>{gsap.set( sliNum, { fontWeight: theme.pageSlideNumFontWeig})} );
       
       cf.add(theme, 'pageSlideScrPosX').name('slide-scro-x').min(-100).max(100).step(.01).onChange( () =>{gsap.set(sliC, {x: theme.pageSlideScrPosX})});
       cf.add(theme, 'pageSlideScrPosY').name('slide-scro-y').min(-100).max(100).step(.01).onChange( () =>{gsap.set(sliC, {y: theme.pageSlideScrPosY})});
       cf.add(theme, 'pageSlideScrWidth').name('slide-scro-with').min(0).max(400).step(.01).onChange( () =>{gsap.set(sliC, {width: theme.pageSlideScrWidth})});
       cf.add(theme, 'pageSlideScrHeight').name('slide-scro-height').min(0).max(400).step(.01).onChange( () =>{gsap.set(sliC, {height: theme.pageSlideScrHeight})});
 
             
    }


    async setReqEvent(){
        const baseUrl = import.meta.env.VITE_API_URL 
        document.getElementById('mscForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.querySelector('.submit-button');
            //const responseMsg = document.getElementById('responseMessage');

            const payload = {
                name: document.getElementById('name').value.trim(),
                sender: document.getElementById('email').value.trim(),
                content: document.getElementById('subject').value.trim()
            };

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                //responseMsg.textContent = '';

                // 3. Send POST request to your Express endpoint
                const response = await fetch(`${baseUrl}api/msc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok) {
                    
                // Success feedback
                //responseMsg.style.color = 'green';
                //responseMsg.textContent = 'Post submitted and notification email sent successfully!';
                
                // Clear form inputs
                document.getElementById('mscForm').reset();
                } else {
                // Error feedback from server validation
                //responseMsg.style.color = 'red';
                //responseMsg.textContent = result.error || 'Failed to submit post.';
                }

            } catch (error) {
                console.error('Submission Error:', error);
                //responseMsg.style.color = 'red';
                //responseMsg.textContent = 'Network error. Please check if server is running.';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Post';
            }
        });
      
    }

}

