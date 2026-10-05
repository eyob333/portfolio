import '../Styles/HUnderlay.css'

export default class HUnderlay{

    constructor(root, ui){
        this.container = root
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
                <div class="slider-cont u-page" >
                    <h1>winter nomad</h1>
                </div>
            </div>
        </div>    

        <div id="project-underlay"> 
            <div class="heading-cont u-page" >
                    <h1>winter nomad</h1>
            </div>   
            <div class="slider-cont u-page" >
                <h1>winter nomad</h1>
            </div>

        </div>

        <div id="model-underlay">    
            <div class="heading-cont u-page" >
                <h1>winter nomad</h1>
            </div>   
            <div class="slider-cont u-page" >
                <h1>winter nomad</h1>
            </div>
        </div>

        <div id="lab-underlay"> 
            <div class="heading-cont u-page" >
                <h1>winter nomad</h1>
            </div>   
            <div class="slider-cont u-page" >
                <h1>winter nomad</h1>
            </div>   
        
        </div>
        <div id="contact-underlay">    
        
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