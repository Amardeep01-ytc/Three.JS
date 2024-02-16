import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

     

/*
  Three js Bulid-in Controls : 
    1. Device Orientation Controls: 
        -Device Orientation control automatically retrive the device orientation if your device is OS and browser allow it and  rotate the camera acccordingly 
        -Useful it to create immersive universe or VR experiences
    
    2. Fly controls :  
        -Fly controls enable to moving a camera like if you were on a spaceship 
        -You can rotate on all 3 axes, go forward and go backword
    
    3. First-Person control :
        - First-person control is like fly control, but with fix up axis 
        - Doesn't work like in 'FPS' Games.
    
    4. Pointer-Lock Controls :
        - Pointer-lock control is uses the pointer lock JavaScript API
        - Hard to use and almost only handles the pointer lock and camera rotation

    5. Orbit Controls :
        - Orbit Controls similar to the controls we made with more features

    6. Track-ball Controls :
        - Track-ball control is like orbit control without the vertical angle limit
    
    7. Transfrom Control :
        - Transform control has nothing to do with camera

    8. Drag Control : 
        - Drag control is same as Transform controls it will also noting to do with camera

         
    When to use controls :
    - Controls are handy, but they have limitations 
    - If you want to use those, make sure that they support all the features you need
    - If not, you'll have to do it at your own
   
*/

