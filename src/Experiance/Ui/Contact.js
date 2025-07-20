import ContactIcons from "../../assets/contactIcons";

export default class Contact{
    constructor(root){
        this.continer = root
        this.array = ContactIcons;
        this.setParent();
        this.setInstance();

    }
    setParent(){
        let parent = document.createElement('section')
        parent.id = 'page5'
        parent.classList.add('page')
        parent.innerHTML  = `
                <hr>
                <h4>Say hi, I'd love to hear from you</h4>
                <div class="contact-container">
                </div>
            `
        let parent2 = document.createElement('section')
        parent2.id = 'page6'
        parent2.classList.add('page')
        parent2.innerHTML = `
                <footer class="footer">
                <p>&copy; 2025 Eyob Jemane. All rights reserved.</p>
                </footer>
        `;
        this.continer.appendChild(parent)
        this.continer.appendChild(parent2)
    }
    setInstance(){
        let element = document.querySelector('div.contact-container');
        let injectElement = this.array.map( d => ` <button onclick="location.href='${d.link}'" type="button"class="contact-icons  ${d.name == 'email' && `last`}">
                    ${d.icon} ${d.name == 'email' ?  `<p>${d.acc}</p>`: ''}
                </button>`).join('');
        element.innerHTML = injectElement;
    }
} 