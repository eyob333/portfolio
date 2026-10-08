import '../Styles/Underlay.css'

import porojectCards from '../../assets/porojectCards';
import labsCards from '../../assets/labsCards';
import modelCards from '../../assets/modelCards';

export default class Underlay{

    constructor(root, ui, cCout){
        this.container = root
        this.cout = cCout;
        console.log(`foosd`,this.cout)

        this.setInstance();        
        if(ui){
            this.debug = ui.addFolder('HUnderlay')
        }

    }

    setInstance(){
        this.container.innerHTML = `
        <div id="home-underlay">
            <div class="header-home overlay">
                <div class="heading-cont u-page" >
                    <h1>winter nomad</h1>
                </div>
                <div class="slider-cont u-slide" >
                    <div class="u-fill u1" >k1</div>
                    <div class="u-fill u2" >k2</div>
                    <div class="u-fill u3" >k3</div>
                </div>
            </div>
        </div>    

        <div id="project-underlay" > 
            <div class="heading-cont u-page" >
                    <h1>proj</h1>
            </div>   
            <div class="slider-cont u-slide" >
                ${this.cout.p.map( ()=>`<div class="u-fill" >k3</div>`).join('')}
                
            </div>

        </div>

        <div id="model-underlay">    
            <div class="heading-cont u-page" >
                <h1>mod</h1>
            </div>   
            <div class="slider-cont u-slide" >
                ${this.cout.m.map( ()=>`<div class="u-fill" >k3</div>`).join('')}
            </div>
        </div>

        <div id="lab-underlay"> 
            <div class="heading-cont u-page" >
                <h1>lab</h1>
            </div>   
            <div class="slider-cont u-slide" >
                ${this.cout.l.map( ()=>`<div class="u-fill" >k3</div>`).join('')}
            </div>   
        
        </div>
        <div id="contact-underlay">    
            <div class="heading-cont u-page" >
               <h1>cont</h1>
            </div>  
        </div>
        `;

    }


    setDebug(){
        // title section
        this.debug.addFolder('h1')
        this.debug.addFolder('p')
        this.debug.addFolder('water-m')
    }
          
}