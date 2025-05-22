import { Injector } from "./Injector";
import projects from "./assets/porojectCards";
import  labs  from "./assets/labsCards";


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