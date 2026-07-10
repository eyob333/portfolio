
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
                <div class="form-wrapper">
                    <h1 class="form-title">System Inquiry / Submission Form</h1>

                    <form>
                        <div class="form-field">
                        <label for="name">Operator Name:</label>
                        <div class="input-border-wrap name-border-wrap">
                            <input type="text" id="name" name="name" value="Commander Elara Vance">
                        </div>
                        </div>

                        <div class="form-field">
                        <label for="email">Encryption Email:</label>
                        <div class="input-border-wrap email-border-wrap">
                            <input type="text" id="email" name="email" value="e.vance.01@starfleet.network">
                        </div>
                        </div>

                        <div class="form-field">
                        <label for="subject">Subject Inquiry Text Area:</label>
                        <div class="subject-border-wrap">
                            <textarea id="subject" name="subject" rows="8">RE: Spatial Anomaly Report (Quadrant 9).
                                Data logs indicate unusual energy readings near the nebula cluster. requesting immediate analysis of quantum fluctuations. (Timestamp: 3145.753) // Awaiting further directives.</textarea>
                        </div>
                        </div>

                        <div class="submit-wrapper">
                            <button type="submit" class="submit-button">Submit Inquiry</button>
                        </div>
                    </form>
                    </div>
            </div>
            `;
        this.container.appendChild(element);
        
    }
}







