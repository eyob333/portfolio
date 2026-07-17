import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";
import App from "../App";

export default class Ui{
    constructor(){
        this.app = new App()
        this.ui = null
        if(this.app.debug.active){
            this.ui = this.app.debug.ui.addFolder("Ui");
        }

        this.container = document.querySelector("div.section-container-div");
        this.nav = new Nav(this.container, this.ui)
        this.home = new Home(this.container, this.ui);
        this.project = new Project(this.container, this.ui);
        this.labs = new Labs(this.container, this.ui);
        this.contact = new Contact(this.container, this.ui)


    }


    // setDebug(){
    //     this.ui = this.debug.ui.addFolder("Ui")
    // }

}

