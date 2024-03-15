import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters ={
    color: 0xff0000,
    spin : () =>
    {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10})
    }

}
gui.add(parameters, 'spin')

gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })

 
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
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//debug
// gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui.add(mesh.position, 'x', -3, 3, 0.01)
// gui.add(mesh.position, 'z', -3, 3, 0.01)
gui 
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

gui
    .add(mesh, 'visible')

gui
    .add(material, 'wireframe')

/**
 * Sizes
 */
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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
Debug-UI -->
    - we need to be able to tweak and debug easily
    - It concers the developer,the designer and even the client
    - It will help finding the perfect color, speed, quentity, dimension, diection, timing, etc.

What we need a "debug UI" -->
    - we ca create our own or we can use a library
    - dat.GUI
    - control-panel
    - ControlKit
    - Guify
    - Oui
In this lesson we are going to use dat.GUI but you should try the other ones

SetUP -->
    It is same as before with the red cube and OrbitControls

How to implement dat.GUI -->
    - we need to add the fat.gui dependency like we added the gsap dependency 
    - In the terminal run 'npm install --save dat.gui'
       and import it with 
      import * as dat from 'dat.gui'

We can now instantiate it
//debug
    const gui = new dat.GUI()

There are different types of elemets you can add to that panel 
- Range = for numbers with minimum and maximum value
- Color = for colors with various formats
- Text  = for simple texts
- Checkbox = for booleans(true or false)
- Select = for a choice from a list of values(like mcq)
- Button = to trigger functions
- Folder = to organize your panel if you have too many elements

Add Elements -->
    - Use gui.add(...) to add an element (a tweak)
    - the first parameter is an object 
    - the second parameter is the property you want to tweak(element)
      gui.add(mesh.position, 'y')
    - The next parameters handle 
        minimum
        maximum
        step(or precision)
      gui.add(mesh.position, 'y', -3, 3, 0.01)
    It will up to only these values 
    
    - we can also use the min(..).max(..)and step(..) methods
      gui.add(mesh.position, 'y').min(-3).max(3).step(0.01)
    It will give same result as before

    -we can also write like this:
    gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)

    -we can change the label with the name(..)method
    gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation')

    -Dat.GUI will change the type of tweak according to the type of property 
    -Add a tweak for the visible property
       gui.add(mesh, 'visible')

    - We can do the same with the wireframe proprty of the material 
       gui.add(material, 'wireframe')

COLORS :
We can Change color of the cube also -->
    - we need to use addColor(...) beacuse Dat.GUI cannot guess that it's not a simple string (eg. '0xff0000' It is only string)
    - we have to create a temporary object in order to have an accessible property
    - Create parameters variable at the start of your code  
        const parameters = {
            color: 0xff0000
        }
    - Then use the addColor(...) method 
        gui.addColor(parameters, 'color')
    - Changing the color doesn't affect the material 
      We need to apply the parameters.color on the material when the color changed
    - we can use onChnage(...) method to know when the tweak value chnaged and 'material.color.set(..)' to update the color
      because 'material.color' is an instance of Color
        const gui = new dat.GUI()

        const parameters ={
           color: 0xff0000
        }

        gui
           .addColor(parameters, 'color')
           .onChange(() =>
           {
               material.color.set(parameters.color)
           })

    - Insted of specifying 0xff0000 in the parameters and in the material,we can use the parameter.color on the material 
        const material = new THREE.MeshBasic.Material({ color : parameters.color })

FUNCTION :
    - To trigger a function, we need to store it in object 
    - we can use the parameters object again and create a spin method
        const parameters ={
         color: 0xff0000,
          spin : () =>
         {
            gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 10})
        }
       }
    - and again ,we can add the tweak to our gui
        gui.add(parameters, 'spin')

TIPS :
    HIDE
       -Press H to hide the panel 
       - and if you want the panel to be hidden at start, use gui.hide()

    Colse
       - close the panel by clicking on its bottom part
       - if you want to be closed at start, send an object when instantiating and pass it 'closed : true'
            const gui = new dat.GUI({ closed : true })
     
    Width 
       - you can drag and drop the panel to change its width 
       - you can change the default width with 'width:...'
            const gui = new dat.GUI({ width : 400 })

*/