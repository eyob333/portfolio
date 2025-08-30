import icons from "../../assets/techStackIcons";

export default class TechStack {
    constructor(root) {
        this.container = root;
        // this.setParent()
        // this.setInstance()
    }
    setParent(){
        let parent = document.createElement('section')
        parent.id = 'page2'
        parent.classList.add('page')
        parent.classList.add('techstack')
        parent.innerHTML = `
                <h1>Tech Stack</h1>
                <div class="techStack-container">
                </div>  
          `
        this.container.appendChild(parent)

    }

    setInstance(){
        const element = document.querySelector('div.techStack-container');
        element.innerHTML = icons.map(icon => `
          <div class="icons-container">
            <div class="svg-container">${icon.svg}</div>
            <p>${icon.name}</p>
          </div>
        `).join('')
    }
}
