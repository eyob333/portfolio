import icons from "./techStackIcons"



const img = 'https://picsum.photos/400'
// const desc = 'Webgl, Godot, Three.js'
const vid = "/videos/smt.mp4"
const rid = [
    icons[1],
    icons[2],
    icons[4],
    icons[0],

]


const gojoHomes = {
    img,
    name: 'Gojo-Homes',
    link: 'https://gojo-home.vercel.app/',
    role: 'fullstack developer',
    vid,
    rid
}

const flowFileds = {
    img,
    name: 'gpgpu flow fields',
    link: 'https://gpgpu-flowfields-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid
}

const ragingSea = {
    img,
    name: 'raging sea',
    link: 'https://three-ragingsea-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid
}

const wobbleSphere = {
    img,
    name: 'wobble sphere',
    link: 'https://wobble-sphere-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid
}

const proceduralTerrian = {
    img,
    name: 'procedural terrain',
    link: 'https://procedural-terrain-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid
}


const projects = [
    ragingSea,
    proceduralTerrian,
    gojoHomes,
    flowFileds,
    wobbleSphere,
]

export default projects