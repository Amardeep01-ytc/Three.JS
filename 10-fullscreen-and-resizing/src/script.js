import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', ()=>
{
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Upadte camera
    camera.aspect = sizes.width / sizes.height
    //when changing properties like aspect, we need to call
    camera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Animate
 */
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
First way : 
Full Screne of windows :
     const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
-With this we can see the Height and Width of viewport Only not the full screne size
-It's working but there is a margin on the top and left and we can scroll
-This is because of browser default stylings

Second Way :
   - we are going to add CSS to the style.css file
   -body{
    margin: 0;
    padding: 0;
    }

Third way : 
    - Move the canvas to the top left corner 
    - .webgl{
        position: fixed;
        top: 0;
        left: 0;
       }
    - add this code to CSS file

Fourth way :
    -Some might have a blue outline on the canvas when they drag and dropping 
    - Fix that with 'outline: none; ' add to CSS file 
    - .webgl{
        position: fixed;
        top: 0;
        left: 0;
        outline : none;
       }

Fifth way : 
    - To make sure that the page is impossible to scroll, add "overflow : hidden" on the both html and body 
    - html, body {
            overflow:hidden;
        }
    - add this code in CSS file



HANDEL RESIZE ==>
    -We need to know when the window is being resized 
    -Listen to the resize event 
    
    window.addEventListener('resize', ()=>
    {
    //Update Sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Upadte camera
    camera.aspect = sizes.width / sizes.height
    //when changing properties like aspect, we need to call
    camera.updateProjectionMatrix()

    //Update Renderer
    renderer.setSize(sizes.width, sizes.height)
    })


HANDEL PIXEL RATIO ==>
    - Some might see a blurry renderer and stairs effect on the edges 
    - If so, It's because you are testing on screen with a Pixel ratio of greater than 1
    - The Pixel Ratio corresponds to how many physical pixels you have on the screen for one pixel unit on the software part 
    - To get the current pixel retio, we can use window.devicePixelRatio to our console
    - To update the renderer accordingly, we can use "renderer.setPixelRatio(window.devicePixelRatio)"
    - renderre.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    - If your screen's Pixel Ratio is 1 then you don't have to change anything with script just add renderre.setPixelRatio(window.devicePixelRatio)


HANDEL FULL SCREEN ==>
    - Let's add support to a fullscreen mode by double clicking anywhere 
    - Listen to the 'dblclick'' event
    - window.addEventListener('dblclick', ()=>
    {
        consloe.log('double click')
    })



 */
