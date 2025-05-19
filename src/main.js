import * as THREE from 'three'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import studio from '@theatre/studio'
import { getProject, types} from '@theatre/core'
import icons from './assets/techStackIocons.js'
import GUI from 'lil-gui'
import projectState from '/state.json'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import testVertex  from './shaders/includes/test/vertexShader.glsl'
import testfragment from './shaders/includes/test/fragmentShader.glsl'


let gui = new GUI().close()
let guiCam = gui.addFolder('camera')
let rotGuiCam = guiCam.addFolder('rotaion');
let posGuiCam = guiCam.addFolder('postion');

const sectionContainingElement = document.querySelector("div.section-container-div");
const loadingTExtElement = document.querySelector("div.loading-text");
const loadingElement = document.querySelector("div.loading-bar");
const loadingNumberElement = document.querySelector("p.loading-number");

const shipMaterial1 = new CustomShaderMaterial({
   baseMaterial: THREE.MeshPhysicalMaterial,
   vertexShader: testVertex,
   fragmentShader: testfragment
})


const loadingManager = new THREE.LoadingManager(
  () =>{
    window.setTimeout( () => {
      gsap.to(overlaymaterial.uniforms.uAlpha, {duration: 4, value:0, delay: 1}) 
      loadingElement.classList.add('enabled');
      loadingElement.style.transform = '';
      loadingTExtElement.classList.add('enabled');
      setTimeout( () =>{
        sectionContainingElement.style.visibility= 'visible';
        sectionContainingElement.style.maxHeight = '100%';
        sectionContainingElement.style.maxWidth = '100%';
        sectionContainingElement.style.overflow = 'auto';
      }, [3000])
    }, 1000)  
  },
  (itemUrl, itemLoaded, itemTotal) => {
    loadingNumberElement.innerHTML = `${Math.round((itemLoaded/itemTotal * 100) * 10)/10}%`;
    loadingElement.style.transform =  `scaleX( ${(itemLoaded/itemTotal)})`;
  }
);


// // //gui
// const gui = new GUI()

// const guiSpaceShip1 =  gui.folders('space ship1')
// const guiSpaceShip2 =  gui.folders('space ship1')

//theathre
studio.initialize();

//Create a project for the animation
const project = getProject('THREE.js x Theatre.js', {state: projectState});
const sheet = project.sheet('scene');
project.ready.then(() => sheet.sequence.play({ iterationCount: 1 }))



// Loaders
// const textureLoader = new THREE.TextureLoader(loadingManager)
const gltfLoader = new GLTFLoader(loadingManager)


//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};


// canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()

// mixer
let mixerShip1 = null;
let mixerShip2 = null;

// model
let ship1;
let ship2;
let robot;


gltfLoader.load(
  '/models/portofolio_model/portofolio_model.gltf',
  ( models ) => { 
    console.log( 'finished')

    ship1 = models.scene.children[0];
    ship2 = models.scene.children[1];
    robot = models.scene.children[2];


    mixerShip1 = new THREE.AnimationMixer(models.scene.children[0]);
    mixerShip2 = new THREE.AnimationMixer(models.scene.children[1]);

    const action1 = mixerShip1.clipAction(models.animations[0]);
    const action2 = mixerShip2.clipAction(models.animations[0]);

    action1.play()
    action2.play()

    models.scene.scale.set( 1, 1, 1)
    scene.add(models.scene) 

    ship1.position.set(0, 0, 0);
    ship2.position.set(0, 10, 0);

    if (ship1) {
    ship1.traverse((child) => {
      if (child.isMesh) child.material = shipMaterial1;
    });
    }

    const modelObj = sheet.object('Object Controller', {
      position: {
        x: ship1.position.x, 
        y: ship1.position.y,
        z: ship1.position.z,
      },
      rotation: types.compound({
        x: types.number(ship1.rotation.x, {range: [-2, 2]}),
        y: types.number(ship1.rotation.y, {range: [-2, 2]}),
        z: types.number(ship1.rotation.z, {range: [-2, 2]})
      }),
    });

    modelObj.onValuesChange( value => {
        ship1.position.set(value.position.x, value.position.y, value.position.z);
        ship1.rotation.set(value.rotation.x, value.rotation.y, value.rotation.z);
    })  
  },
  () => console.log( 'loading'),
  () => console.log( 'error'),
)




// function moveObject (){
//   if 
// }

// INJECTOR
const techStackElement = document.querySelector('div.techStack-container')
const htmlArray = icons.map( d => {
  return `<div class="icons-container" >
        <div class="svg-container">${d.svg} </div>
        <p>${d.name}</p>
    </div>`
  }
);

const htmlArrayFinal = htmlArray.join('')
techStackElement.innerHTML = htmlArrayFinal;
// overlay
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlaymaterial = new THREE.ShaderMaterial({
  uniforms: {
    uAlpha: {value: 1.0}
  },
  vertexShader: `
  void main (){
    gl_Position = vec4(position, 1.0);
  }
  `,
  fragmentShader: `
    uniform float uAlpha;
    void main (){
      gl_FragColor = vec4(.0, .0, .0, uAlpha);
    }
  `,
  transparent: true
})

const overlay = new THREE.Mesh( overlayGeometry, overlaymaterial);
scene.add(overlay)

// light

const ambientLight = new THREE.AmbientLight('#ffffff', .5)
scene.add( ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 5.)
directionalLight.castShadow = true
directionalLight.position.set( 0, 5, 2)
scene.add( directionalLight)


// resize event 
window.addEventListener( 'resize', () => {

  sizes.height = window.innerHeight
  sizes.width = window.innerWidth

  camera.aspect = sizes.width/ sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize( sizes.width, sizes.height)
  renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2))
})

//mouse event
// window.addEventListener("mousemove", (e) =>{
//   // console.log("foo x", (e.clientX/sizes.width) -0.5)
//   // console.log("foo y", (e.clientY/sizes.height )-0.5)
//   // console.log(e)
// })


// window.addEventListener("scroll", e => {
//   const scrolly = window.scrollY
//   console.log("scrol", Math.round( scrolly/sizes.height));
// });

// camera

const camera = new THREE.PerspectiveCamera( 75, sizes.width/ sizes.height, 0.1, 100);
camera.position.set(-1,0,6)
scene.add( camera )

posGuiCam.add(camera.position, 'x').step(0.00001).max(10).min(-10).name('x');
posGuiCam.add(camera.position, 'y').step(0.00001).max(10).min(-10).name('y');
posGuiCam.add(camera.position, 'z').step(0.00001).max(10).min(-10).name('z');

rotGuiCam.add(camera.rotation, 'x').step(0.001).max(Math.PI * 2).min(Math.PI * -2).name('x');
rotGuiCam.add(camera.rotation, 'y').step(0.001).max(Math.PI * 2).min(Math.PI * -2).name('y');
rotGuiCam.add(camera.rotation, 'z').step(0.001).max(Math.PI * 2).min(Math.PI * -2).name('z');

// // Create a Theatre Object to control the camera
// const cameraObj = sheet.object('Camera Controller', {
//   position: types.compound({
//     x: types.number(camera.position.x, { nudgeMultiplier: 0.1 }),
//     y: types.number(camera.position.y, { nudgeMultiplier: 0.1 }),
//     z: types.number(camera.position.z, { nudgeMultiplier: 0.1 }),
//   }),
//   rotation: types.compound({
//     x: types.number(camera.rotation.x, { nudgeMultiplier: 0.1 }),
//     y: types.number(camera.rotation.y, { nudgeMultiplier: 0.1 }),
//     z: types.number(camera.rotation.z, { nudgeMultiplier: 0.1 }),
//   }),
// })


// //controls
// const controls = new OrbitControls( camera, canvas)
// controls.enableDamping = true

// renderer
const renderer = new THREE.WebGLRenderer( { canvas })
renderer.setSize( sizes.width, sizes.height)
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// animation
const clock = new THREE.Clock()
let currentTime = 0


function tick(){
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - currentTime
  currentTime = elapsedTime

  if (mixerShip1){
    mixerShip1.update( deltaTime * .1 )
  }
  if (mixerShip2){
    mixerShip2.update( deltaTime * .1 )
  }
  // // theatre
  // const pos = cameraObj.value.position
  // const rot = cameraObj.value.rotation
  // camera.position.set(pos.x, pos.y, pos.z)
  // camera.rotation.set(rot.x, rot.y, rot.z)

  // if(ship1 && modelObj){
  //   const posS = modelObj.value.position
  //   const rotS = modelObj.value.rotation
  //   ship1.position.set(posS.x, posS.y, posS.z)
  //   ship1.rotation.set(rotS.x, rotS.y, rotS.z)
  // }
  

  // // update controls
  // controls.update()

  // update renderer
  renderer.render( scene, camera)

  requestAnimationFrame( tick)
}

tick()
