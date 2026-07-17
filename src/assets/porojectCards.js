import icons from "./techStackIcons"



const img = 'https://picsum.photos/400'
const desc = 'lourem ipsum,ipsum lourem lot set,scout ament,bala bal secundus'

// let k = desc.split(',')
// console.log("foo", k)

const vid = "/videos/smt.mp4"
const rid = [
    icons[1],
    icons[2],
    icons[4],
    icons[0],
    icons[5],
    icons[1],
    icons[7]

]


const gojoHomes = {
    img,
    name: 'Gojo-Homes',
    link: 'https://gojo-home.vercel.app/',
    role: 'fullstack developer',
    vid,
    rid,
    desc: desc.split(',')
}

const flowFileds = {
    img,
    name: 'gpgpu flow fields',
    link: 'https://gpgpu-flowfields-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid,
    desc: desc.split(',')

}

const ragingSea = {
    img,
    name: 'raging sea',
    link: 'https://three-ragingsea-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid,
     desc: desc.split(',')

}

const wobbleSphere = {
    img,
    name: 'wobble sphere',
    link: 'https://wobble-sphere-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid,
    desc: desc.split(',')

}

const proceduralTerrian = {
    img,
    name: 'procedural terrain',
    link: 'https://procedural-terrain-shaders.vercel.app/',
    role: 'frontend developer, shader artist',
    vid,
    rid,
    desc: desc.split(',')

}


const projects = [
    ragingSea,
    proceduralTerrian,
    gojoHomes,
    flowFileds,
    wobbleSphere,
]

export default projects