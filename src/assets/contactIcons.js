import icons from "./techStackIcons";


const github = `
   <svg viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>.cls-1{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;fill-rule:evenodd;}
                </style>
            </defs>
            <path class="cls-1" d="M24,2.5a21.5,21.5,0,0,0-6.8,41.9c1.08.2,1.47-.46,1.47-1s0-1.86,0-3.65c-6,1.3-7.24-2.88-7.24-2.88A5.7,5.7,0,0,0,9,33.68c-1.95-1.33.15-1.31.15-1.31a4.52,4.52,0,0,1,3.29,2.22c1.92,3.29,5,2.34,6.26,1.79a4.61,4.61,0,0,1,1.37-2.88c-4.78-.54-9.8-2.38-9.8-10.62a8.29,8.29,0,0,1,2.22-5.77,7.68,7.68,0,0,1,.21-5.69s1.8-.58,5.91,2.2a20.46,20.46,0,0,1,10.76,0c4.11-2.78,5.91-2.2,5.91-2.2a7.74,7.74,0,0,1,.21,5.69,8.28,8.28,0,0,1,2.21,5.77c0,8.26-5,10.07-9.81,10.61a5.12,5.12,0,0,1,1.46,4c0,2.87,0,5.19,0,5.9s.39,1.24,1.48,1A21.5,21.5,0,0,0,24,2.5">
            </path>
        </g>
    </svg>
`;

const telegram = `
    <svg viewBox="0 0 48 48" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <defs>
                <style>.cls-1{fill:none;stroke:#ffffff;stroke-linecap:round;stroke-linejoin:round;}</style>
            </defs>
            <path class="cls-1" d="M40.83,8.48c1.14,0,2,1,1.54,2.86l-5.58,26.3c-.39,1.87-1.52,2.32-3.08,1.45L20.4,29.26a.4.4,0,0,1,0-.65L35.77,14.73c.7-.62-.15-.92-1.07-.36L15.41,26.54a.46.46,0,0,1-.4.05L6.82,24C5,23.47,5,22.22,7.23,21.33L40,8.69a2.16,2.16,0,0,1,.83-.21Z">
            </path>
        </g>
     </svg>
`;

const  discord = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M14.55 40.17c3.53 2.67 8.86 5.46 17.45 5.46s13.92-2.79 17.45-5.46"></path>
            <path d="M48 22.18c-4.31-2.2-8.57-4.26-16-4.26S20.33 20 16 22.18"></path><path d="m27.32 18.23-1.87-3.68a22.75 22.75 0 0 0-10.9 4.36S9 27 8 42.91c5.63 6.49 14.18 6.54 14.18 6.54L25.5 45"></path><path d="m38.5 45 3.32 4.42s8.55-.02 14.18-6.51c-1-15.9-6.55-24-6.55-24s-5-3.92-10.9-4.36l-1.82 3.69"></path>
            <ellipse cx="24.91" cy="34.18" rx="3.82" ry="4.36"></ellipse>
            <ellipse cx="39.09" cy="34.18" rx="3.82" ry="4.36"></ellipse>
        </g>
    </svg>
`

const email = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"><polygon points="56 20 32 12 8 20 8 52 56 52 56 20">
            </polygon><polyline points="48 28 32 36 16 28">
            </polyline>
        </g>
    </svg>
`


const ContactIcons = [
    {name: 'telegram', link: 'https://t.me/chasingShadows4', icon: telegram},
    {name: 'discord', link: 'https://discord.gg/someting', icon: discord},
    {name: 'github', link: 'https://github.com/eyob333',icon: github},
    {name: 'email', link: 'mailto:jemijobs224@gmail.com?subject=Hello&body=I wanted to reach out...', icon: email, acc: 'jemijobs@gmail.com'},
]

export default ContactIcons