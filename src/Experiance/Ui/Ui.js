import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";

export default class Ui{
    constructor(){
        this.container = document.querySelector("div.section-container-div");
        this.nav = new Nav(this.container)
        this.home = new Home(this.container);
        this.project = new Project(this.container);
        this.labs = new Labs(this.container);
        this.contact = new Contact(this.container)
        // this.model = new models(this.container);
    }

}

