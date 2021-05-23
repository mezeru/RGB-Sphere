// import './style.css'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'dat.gui'

const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load("/static/NormalMap.png")
// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.6, 32, 32);

// Materials

const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0x292929)
material.emissive = new THREE.Color(0x0);
material.roughness = 0.25;
material.metalness = 0.6;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight2 = new THREE.PointLight(0xff0000, 1.5);
pointLight2.position.set(-1.33,1.16,-0.46);
scene.add(pointLight2)

const pointLight = new THREE.PointLight(0x008000, 0.5);
pointLight.position.set(1,1,10);
scene.add(pointLight)

const pointLight3 = new THREE.PointLight(0x0033cc, 0.7);
pointLight3.position.set(5,-5,-2);
scene.add(pointLight3)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.addEventListener('scroll',changeSphere);

function changeSphere(event){
    sphere.position.y = window.scrollY * 0.002;
}

document.addEventListener('mousemove',onMouseMove);

let MouseX = 0
let MouseY = 0


let TargetX = 0
let TargetY = 0


const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2


function onMouseMove(event){
    MouseX = (event.clientX - windowHalfX)
    MouseY = (event.clientY - windowHalfY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    TargetX = MouseX*0.001;
    TargetY = MouseY*0.001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 2 * elapsedTime

    sphere.rotation.y += 0.6 * (TargetX - sphere.rotation.y );
    sphere.rotation.x += 0.6 * (TargetY - sphere.rotation.x );
    sphere.position.z += -2 * (TargetY - sphere.rotation.x );


    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()