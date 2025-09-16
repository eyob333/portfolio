
export default class Home{

    constructor(root){
        this.container = root
        // this.setInstance();
    }

    setInstance(){
        let element = document.createElement('section');
        element.id = 'heading';
        element.classList.add('page');
        element.innerHTML = `
            <h1>winter nomad</h1>
            <div class="mask">
                <h4 class="primary">Software Engnieer</h4>
                <h4 class="secondary">Fullstack Developer</h4>
                <h4 class="teritiary">Shader Artist</h4> 
                <h4 class="fourth">Createive Developer</h4>
            </div>
        `;
        this.container.appendChild(element);
    }
          
}