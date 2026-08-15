import '../Styles/Home.css'

export default class HUnderlay{

    constructor(root, ui){
        this.container = root
        this.setInstance();
        if(ui){
            this.debug = ui.addFolder('HUnderlay')
        }

    }

    setInstance(){
        let element = document.createElement('div');
        element.id = 'homeUnderlay';
        element.classList.add('page');
        element.innerHTML = `
            <div class="header-home overlay">
                <div class="heading-cont" >
                    <h1>winter nomad</h1>
                </div>
            </div>
        `;

        this.container.appendChild(element);

    }


    setDebug(){
        // title section
        this.debug.addFolder('h1')
        this.debug.addFolder('p')
        this.debug.addFolder('water-m')
    }
          
}