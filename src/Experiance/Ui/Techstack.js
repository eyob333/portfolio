import icons from "../../assets/techStackIcons";

export default class TechStack {
    constructor() {
        const container = document.querySelector('div.techStack-container');
        container.innerHTML = icons.map(icon => `
          <div class="icons-container">
            <div class="svg-container">${icon.svg}</div>
            <p>${icon.name}</p>
          </div>
        `).join('');
    }
}
