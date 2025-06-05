
import projects from "./assets/porojectCards.js";
import  labs  from "./assets/labsCards.js";
import { Injector } from "./injector.js";
import { Icons as icons}  from "./assets/contactIcons.js";


class InjectorManager{
    constructor(){
        this.projectElement = document.querySelector('div.project-container');
        this.labsElement = document.querySelector('div.Labs-container');
        this.contactElemnt = document.querySelector('div.contact-container')
        this.project = projects;
        this.labs = labs;
        this.contact = icons;

        this.injectP = new Injector(this.project, this.projectElement, 'element');
        this.injectL = new Injector(this.labs, this.labsElement, 'element');
        this.injectI = new Injector(this.contact, this.contactElemnt, 'icon');
    }
}

export { InjectorManager }