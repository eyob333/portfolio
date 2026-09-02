import App from "../App";

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
        this.project = new Project(this.container, this.ui, this.device);        
        this.models = new Models(this.container, this.ui, this.device)
        this.labs = new Labs(this.container, this.ui, this.device);
        this.contact = new Contact(this.container, this.ui)

        this.homeUnderlay = new HUnderlay(this.underlay, this.ui);

    }


    setDebug(){
        this.ui.addFolder("main")
    }

}

