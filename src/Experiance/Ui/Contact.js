import ContactIcons from "../../assets/contactIcons";

export default class Contact{
    constructor(){
        this.contactElement = document.querySelector('div.contact-container');
        this.array = ContactIcons;
        this.intial();
        this.parent = `
            <section id="page5" class="page">
                <hr>
                <h4>Say hi, I'd love to hear from you</h4>
                <div class="contact-container">
                </div>
                
            </section>

            <section id="page6" class="page">
                <footer class="footer">
                <p>&copy; 2025 Eyob Jemane. All rights reserved.</p>
                </footer>
            </section>
        `;
        
    }
    intial(){
        this.injectElement = this.array.map( d => ` <button onclick="location.href='${d.link}'" type="button"class="contact-icons  ${d.name == 'email' && `last`}">
                    ${d.icon} ${d.name == 'email' ?  `<p>${d.acc}</p>`: ''}
                </button>`).join('');
        this.contactElement.innerHTML = this.injectElement;
    }
} 