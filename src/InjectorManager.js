
import projects from "./assets/porojectCards.js";
import  labs  from "./assets/labsCards.js";
import { Injector } from "./Injector.js";

class InjectorManager{
    constructor(){
        this.projectElement = document.querySelector('div.project-container');
        this.labsElement = document.querySelector('div.Labs-container');
        this.project = projects;
        this.labs = labs;
        this.injectP = new Injector(this.project, this.projectElement);
        this.injectL = new Injector(this.labs, this.labsElement);
    }
}

export { InjectorManager }