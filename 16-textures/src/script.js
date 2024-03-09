import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
// const image = new Image()

// image.onload = () =>
// {
//     const texture = new THREE.Texture(image)
//     console.log(texture)
// }

// image.src = '/textures/door/color.jpg '

// const image = new Image()
// const texture = new THREE.Texture(image)

// image.onload = () =>
// {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

//Texture Loader
const loadingManager =new THREE.LoadingManager()

// loadingManager.onStart = () =>
// {
//     console.log('onStart')
// }
// loadingManager.onLoad = () =>
// {
//     console.log('onLoad')
// }
// loadingManager.onProgress = () =>
// {
//     console.log('onProgress')
// }
// loadingManager.onError = () =>
// {
//     console.log('onError')
// }
const TextureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = TextureLoader.load('/textures/checkerboard-1024x1024.png')
 const colorTexture = TextureLoader.load('/textures/checkerboard-8x8.png')
const alphaTexture = TextureLoader.load('/textures/door/alpha.jpg')
const heightTexture = TextureLoader.load('/textures/door/height.jpg')
const normalTexture = TextureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = TextureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = TextureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = TextureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
 
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.magFilter =THREE.NearestFilter
//  colorTexture.magFilter =THREE.LinearFilter


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
// const geometry = new THREE.SphereBufferGeometry(1, 32, 100 ) //creates Sphere
// const geometry = new THREE.ConeBufferGeometry(1, 1, 32) //Creates cone Shaped
// const geometry = new THREE.TorusBufferGeometry(1, 0.35, 32, 100) //looks like doughnet 
const material = new THREE.MeshBasicMaterial({ map : colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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
