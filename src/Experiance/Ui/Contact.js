
export default class Contact{
    constructor(root){
        this.container = root
        this.setInstance()
    }

    setInstance(){
        let element = document.createElement('section')
        element.id = 'contact';
        element.classList.add('page');
        element.innerHTML = `
            <div class="contacts">
                <div class="ks">
                    <h4>Say hi, I'd love to hear from you</h4>
                    <div class="forms">
                        <form action="https://formspree.io/f/your_formspree_id">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your Name" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Email Address</label>
                                <input type="email" id="email" name="_replyto" placeholder="your.email@example.com" required>
                            </div>

                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Type your message here..." required></textarea>
                            </div>
                            <button type="button" class="smthin">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
        this.container.appendChild(element);
        
    }
}







