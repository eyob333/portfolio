
export default class Home{

    constructor(root){
        this.container = root
        this.setInstance();
    }

    setInstance(){
        let element = document.createElement('section')
        element.id = 'heading'
        element.classList.add('page')
        element.innerHTML = `
            <h1> Hi, Am Winter Nomad</h1>
            <h4> a Software Engineer</h4>
            `
        console.log("helloo")
        this.container.appendChild(element)
    }
          
}