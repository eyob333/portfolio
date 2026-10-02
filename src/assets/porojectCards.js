// ProjectCards.js
import icons from "./techStackIcons"

export default (resources) => {
    console.log(`ssdfsdf`,resources)
    const descText = 'lourem ipsum,ipsum lourem lot set,scout ament,bala bal secundus';
    const splitDesc = descText.split(',');
    const thum = resources.item.smtfT || ''
    const vid = resources.item.smtf || ''

    const rid = [
        icons[1],
        icons[2],
        icons[4],
        icons[0],
        icons[5],
        icons[1],
        icons[7]
    ];

    const gojoHomes = {
        name: 'Gojo-Homes',
        link: 'https://gojo-home.vercel.app/',
        role: 'fullstack developer',
        vid,
        rid,
        thum,
        desc: splitDesc
    };

    const flowFileds = {
        name: 'gpgpu flow fields',
        link: 'https://gpgpu-flowfields-shaders.vercel.app/',
        role: 'frontend developer, shader artist',
        vid,
        rid,
        thum,
        desc: splitDesc
    };

    const ragingSea = {
        name: 'raging sea',
        link: 'https://three-ragingsea-shaders.vercel.app/',
        role: 'frontend developer, shader artist',
        vid,
        rid,
        thum,
        desc: splitDesc
    };

    const wobbleSphere = {
        name: 'wobble sphere',
        link: 'https://wobble-sphere-shaders.vercel.app/',
        role: 'frontend developer, shader artist',
        vid,
        rid,
        thum,
        desc: splitDesc
    };

    const proceduralTerrian = {
        name: 'procedural terrain',
        link: 'https://procedural-terrain-shaders.vercel.app/',
        role: 'frontend developer, shader artist',
        vid,
        rid,
        thum,
        desc: splitDesc
    };

    return [
        ragingSea,
        proceduralTerrian,
        gojoHomes,
        flowFileds,
        wobbleSphere,
    ];
};