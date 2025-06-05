import ContactIcons from "../../assets/contactIcons";

export default class Contact{
    constructor(){
        this.contactElement = document.querySelector('div.contact-container');
        this.array = ContactIcons;
        this.intial();
        
    }
    intial(){
        this.injectElement = this.array.map( d => ` <button onclick="location.href='${d.link}'" type="button"class="contact-icons  ${d.name == 'email' && `last`}">
                    ${d.icon} ${d.name == 'email' ?  `<p>${d.acc}</p>`: ''}
                </button>`).join('');
        this.contactElement.innerHTML = this.injectElement;
    }
} 