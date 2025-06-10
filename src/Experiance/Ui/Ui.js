import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import TechStack from "./Techstack";
import Contact from "./Contact";

export default class Ui{
    constructor(){
        // this.setInstance();
    }

    setInstance(){
        this.home = new Home();
        this.project = new Project();
        this.techstack = new TechStack();
        this.labs = new Labs();
        this.Contact = new Contact();
    }
}

