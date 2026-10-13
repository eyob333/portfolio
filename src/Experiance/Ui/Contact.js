import { formIcons } from '../../assets/contactIcons'
import { theme } from '../../assets/config'
import gsap from 'gsap'
import '../Styles/Contact.css'

export default class Contact{
    constructor(root, ui){
        this.container = root
        this.setInstance()

        if(ui){
            this.debug = ui.addFolder('contact')
            this.setDebug();
        }
    }

    setInstance(){
        this.element = document.createElement('section')
        this.element.id = 'contact';
        this.element.classList.add('page');
        this.element.innerHTML = `
            <div class="s-empty">  </div>
            <div class="contacts">
                <div class="form-wrapper">
                    <h1 class="form-title">Got an idea, a project, or just want to chat? Drop a message below</h1>

                    <form id="mscForm">
                        <div class="form-field">
                            <label for="name">Name</label>
                            <div class="input-border-wrap name-border-wrap">
                                <input type="text" id="name" name="name" value="Commander Elara Vance">
                            </div>
                        </div>

                        <div class="form-field">
                            <label for="email">Email</label>
                            <div class="input-border-wrap email-border-wrap">
                                <input type="text" id="email" name="email" value="e.vance.01@starfleet.network">
                            </div>
                        </div>

                        <div class="form-field">
                            <label for="subject">Subject</label>
                            <div class="subject-border-wrap">
                                <textarea id="subject" name="subject" rows="8">RE: Spatial Anomaly Report (Quadrant 9).
                                    Data logs indicate unusual energy readings near the nebula cluster. requesting immediate analysis of quantum fluctuations. (Timestamp: 3145.753) // Awaiting further directives.</textarea>
                            </div>
                        </div>

                        <div class="submit-wrapper">
                            <button type="submit" class="submit-button">Submit</button>
                        </div>
                        <div class="swq">
                            <p class="sp">or</p>
                            <div class="socials"> 
                            </div>
                        
                        </div>
                    </form>
                </div>

                <div class="footer-mark"> <p>something something </p> </div> 
                
            </div>
            `;
        this.container.appendChild(this.element);
        
        let icons = document.querySelector("#contact .socials")
        icons.innerHTML = formIcons.map( i =>`
            <div class="icons"> 
                <div class="icon-s soc-li ${i.name}" data-link="${i.link}"> 
                    ${i.icon}
                </div>
            </div>
            `).join("")
    }


    setDebug(){

        const sg = this.element.querySelector('.form-wrapper');
        const formHed = this.element.querySelector('.text-cont .subhead-cont')
        const inputTex = this.element.querySelector('.text-cont .subhead-cont')
        const formIco = this.element.querySelector('.text-cont .subhead-cont')


        this.debug.add(theme, 'contFormPosX').name('form-wrap-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(sg, {x: theme.contFormPosX})});
        this.debug.add(theme, 'contFormPosY').name('form-wrap-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {y: theme.contFormPosY})});
    }
}







