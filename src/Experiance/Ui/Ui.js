import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import TechStack from "./Techstack";
import Contact from "./Contact";
import About from "./About";


export default class Ui{
    constructor(){
        this.container = document.querySelector("div.section-container-div");
        this.home = new Home(this.container);
        this.project = new Project(this.container);
        this.techstack = new TechStack(this.container);
        this.labs = new Labs(this.container);
        this.about = new About(this.container)
        this.Contact = new Contact(this.container);
    }

}

