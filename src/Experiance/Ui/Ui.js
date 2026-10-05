import App from "../App";
import gsap from "gsap";

import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";
import Models from "./Models";
import HUnderlay from "./HUnderlay";



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
            this.setDebug()
        }

        this.nav = new Nav(this.container, this.ui)
        this.home = new Home(this.container, this.ui);
        this.project = new Project(this.container, this.ui, this.device, this.resouces);        
        this.models = new Models(this.container, this.ui, this.device, this.resouces)
        this.labs = new Labs(this.container, this.ui, this.device, this.resouces);
        this.contact = new Contact(this.container, this.ui)

        this.homeUnderlay = new HUnderlay(this.underlay, this.ui);

        this.setUi();

    }

    setUi() {
        let element = document.querySelector('.main-icon svg');
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


    setDebug(){
        this.ui.addFolder("main")
    }

}

