import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//let time = date.now()

//clock
const clock = new THREE.Clock()
//Animations
const tick =  () =>
{
    // Time = we need to know how much time it's been since the last tick 
    // so we use Date.now() to get the current timestamp
     const time = Date.now()
     console.log(time)

    //For clock 
    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime


    //Time 
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime
    // console.log(deltaTime);
    //Update Objects
    //mesh.position.z += 0.01 //for the change of position 
   // mesh.rotation.z += 0.01
    //mesh.rotation.y += 0.01 //*deltaTime  //for the rotation
    
    //render
    renderer.render(scene, camera)
    
    window.requestAnimationFrame(tick)
}
tick()