import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import * as CANNON from 'cannon-es'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

//gui
const gui = new GUI()

// canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene()


// Loders
const fontLoder = new FontLoader()
const textureLoader = new THREE.TextureLoader()


// fonts

let text = null

fontLoder.load( 
  './fonts/helvetiker_regular.typeface.json',
   font => {
      const textMaterial = new THREE.MeshMatcapMaterial()
      const textGeometry = new TextGeometry(
          'jkl',
          {
            font: font,
            size: 0.5,
            depth: .2,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: .03,
            bevelSize: .02,
            bevelOffset: 0.,
            bevelSegments: 5,

          }
        )
      text = new THREE.Mesh( 
        textGeometry,
        textMaterial,
      )
      textGeometry.center()
      scene.add( text )

    },
  () => { console.log( 'loding')},
  () => { console.log( 'faild')}

)


// physics
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.gravity.set( 0, -9.82,0)

const floorBody = new CANNON.Body( {
  mass: 0,
  shape: new CANNON.Plane(),
})
floorBody.quaternion.setFromAxisAngle( new CANNON.Vec3( -1, 0, 0 ), 0.5 * Math.PI)
world.addBody( floorBody )

// const spherebody = new CANNON.Body( {
//   mass: 1,
//   shape: new CANNON.Sphere(.2),
//   position: new CANNON.Vec3( 0, 5, 0)

// }) 
// world.addBody( spherebody )

const textBody = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Box(),
})
world.addBody( textBody)


// // text box

// const box = new THREE.Mesh( 
//   new THREE.BoxGeometry(1, 1),
//   new THREE.MeshBasicMaterial({ color: '#ffff4f'})
// )
// scene.add( box)

// test box

// const textBox = new THREE.Mesh(
//   new THREE.BoxGeometry(1, .6, .5),
//   new THREE.MeshBasicMaterial()
  
// )

// scene.add( textBox)

// plane
const plane = new THREE.Mesh( 
  new THREE.PlaneGeometry(10,10),
  new THREE.MeshBasicMaterial({color: '#777777'})
)
plane.rotation.x  = Math.PI * 0.5 * -1.
scene.add(plane)

// sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshBasicMaterial()
)
sphere.position.set( 0, 5, 0);
sphere.scale.set( .2, .2, .2)
scene.add( sphere)


// resize event 
window.addEventListener( 'resize', () => {

  camera.aspect = window.innerWidth/ window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight)
  renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2))
})

// camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 100);
camera.position.set(1,3,3)
scene.add( camera )

//controls
const controls = new OrbitControls( camera, canvas)
controls.enableDamping = true

// renderer
const renderer = new THREE.WebGLRenderer( { canvas })
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2))


// animation
const clock = new THREE.Clock()
let currentTime = 0

function tick(){
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - currentTime
  currentTime = elapsedTime

  // update physics world
  world.step( 1/60, deltaTime, 3);
  // sphere.position.copy( spherebody.position )
  plane.quaternion.copy( floorBody.quaternion)

  if (text !== null ){
  text.position.copy( textBody.position )}



  // update controls
  controls.update()

  // update renderer
  renderer.render( scene, camera)

  requestAnimationFrame( tick)
}

tick()
