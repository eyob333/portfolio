import gsap from "gsap";
import App from "../App";
import Event from "../Utils/Event";

import Nav from "./Nav";
import Home from "./Home";
import Project from "./Project";
import Labs from "./Labs";
import Contact from "./Contact";
import Models from "./Models";
import Underlay from "./Underlay";
import { theme } from "../../assets/config";
import { addDebugColorC, addDebugC } from "../Utils/Helper";



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

        let k = this.device.mobile ? 0 : 2;
        console.log(`ffo`, k);

        this.cCout = {
            p: this.project.cardCount(), 
            l: this.labs.cardCount().slice(0, -k),
            m: this.models.cardCount().slice(0, -k),
        }

        this.homeUnderlay = new Underlay(this.underlay, this.ui, this.cCout);

        this.event = new Event();
        this.setReqEvent();

    }




    setDebug(){
        const df = this.ui.addFolder("theme")
            .close();
        const cf = this.ui.addFolder('commons')
            //.close();    

        //theme
        const el = document.querySelector(`.underlay-container-div`)
        const lg = document.querySelector('.lil-gui')
        const sg = document.querySelector('.stat-dom-k')



       df.addColor(theme, 'bgColor').name('background-c').onChange( () =>{gsap.set(el, {backgroundColor: theme.bgColor})});

       df.add(theme, 'lilGuiX').name('lil-gui-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(lg, {x: theme.lilGuiX})});
       df.add(theme, 'lilGuiY').name('lil-gui-x').min(-500).max(500).step(.1).onChange( () =>{gsap.set(lg, {x: theme.lilGuiY})});

       df.add(theme, 'statX').name('stats-x').min(-300).max(40).step(.1).onChange( () =>{gsap.set(sg, {x: theme.statX})});
       df.add(theme, 'statY').name('stats-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {x: theme.statY})});

        //commons
        //heading
       const headCont = document.querySelector('.stat-dom-k');
       const subHeCont = document.querySelector('.stat-dom-k');
       cf.add(theme, 'statY').name('stats-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {x: theme.statY})});

       //slide
       const sliNum = document.querySelector('.stat-dom-k');
       const sliTitle = document.querySelector('.stat-dom-k');
       const sliC = document.querySelector('.stat-dom-k');
       
       cf.add(theme, 'statY').name('stats-y').min(-500).max(500).step(.1).onChange( () =>{gsap.set(sg, {x: theme.statY})});

        
        
    }


    async setReqEvent(){
        const baseUrl = import.meta.env.VITE_API_URL 
        document.getElementById('mscForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = document.querySelector('.submit-button');
            //const responseMsg = document.getElementById('responseMessage');

            const payload = {
                name: document.getElementById('name').value.trim(),
                sender: document.getElementById('email').value.trim(),
                content: document.getElementById('subject').value.trim()
            };

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                //responseMsg.textContent = '';

                // 3. Send POST request to your Express endpoint
                const response = await fetch(`${baseUrl}api/msc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
                });

                const result = await response.json();

                if (response.ok) {
                    
                // Success feedback
                //responseMsg.style.color = 'green';
                //responseMsg.textContent = 'Post submitted and notification email sent successfully!';
                
                // Clear form inputs
                document.getElementById('mscForm').reset();
                } else {
                // Error feedback from server validation
                //responseMsg.style.color = 'red';
                //responseMsg.textContent = result.error || 'Failed to submit post.';
                }

            } catch (error) {
                console.error('Submission Error:', error);
                //responseMsg.style.color = 'red';
                //responseMsg.textContent = 'Network error. Please check if server is running.';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Post';
            }
        });
      
    }

}

